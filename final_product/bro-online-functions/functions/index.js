const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
const {db} = require('./util/admin');

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

