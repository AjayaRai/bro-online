const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
const {admin, db} = require('./util/admin');
const config = require('./util/config');

const {
    signup,
    login,
    getUsers,
    getUserDetails
} = require('./handlers/users');

const {
    getAgroup,
    getUserGroups,
    addGroup,
    getAllGroups,
    addMemToGrp,
    removeMemFromGrp,
    deleteGroup,
    getGrpBio,
    addUpdateGrpBio
} = require('./handlers/groups');

app.post('/signup', signup);
app.post('/login', login);

app.get('/user', FBAuth, getUserDetails)
app.get('/users', FBAuth, getUsers);
app.post('/user/image', FBAuth, (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({error: 'Wrong file type submitted'});
        }
        // my.image.png
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        // 634345245245.png
        imageFileName = `${Math.round(Math.random()*100000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

                return db.doc(`/users/${req.user.userName}`).update({imageUrl});
            })
            .then(() => {
                return res.json({message: 'Image uploaded successfully'});
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({error: err.code});
            })
    })
    busboy.end(req.rawBody);
})

app.get('/get_my_grps', FBAuth, getUserGroups)
app.post('/add_interest', FBAuth, addGroup);
app.delete('/group/:groupId', FBAuth, deleteGroup)
app.get('/groups/:docId', FBAuth, getAgroup)
app.get('/groups', FBAuth, getAllGroups)

app.post('/add_member', FBAuth, addMemToGrp);
app.delete('/group/:groupId/groupMember/:userId', FBAuth, removeMemFromGrp);

app.get('/group_bio/:docId', FBAuth, getGrpBio)
app.post('/group_bio/:docId', FBAuth, addUpdateGrpBio)


exports.api = functions.https.onRequest(app);

exports.rmvMemFromGrp = functions
    .region('europe-west2')
    .firestore
    .document('groups/{groupId}/groupMembers/{userName}')
    .onDelete(async (snapshot, context) => {
        const groupId = context.params.groupId;
        const userName = context.params.userName;

        db
            .collection('users')
            .doc(userName)
            .collection('interests')
            .doc(groupId)
            .delete()
            .then(() => {
                return Promise.resolve("Successfully deleted the relevant interest"); // Not sure how to display msg, is it even returning this?
            })
            .catch((err) => {
                console.error(err);
            })
    })

