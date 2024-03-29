const {db, admin} = require('../util/admin')

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        namee: req.body.namee
    }

    const noImg = 'no-img.png';

    let token, userId;
    db.doc(`/users/${newUser.userName}`).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({handle: 'this userName is already taken'})
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                userName: newUser.userName,
                email: newUser.email,
                userId,
                namee: newUser.namee,
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
            }

            return db.doc(`/users/${newUser.userName}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({token});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
};

exports.login = (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({token});
        })
};

exports.getUsers = (req, res) => {
    const jsonSchema = [];

    db
        .collection('users')
        .get()
        .then((data) => {
            data.forEach((doc) => {
                jsonSchema.push({
                    name: doc.data().namee,
                    userName: doc.data().userName,
                    imageUrl: doc.data().imageUrl
                });

            })
            res.json(jsonSchema);
        }).catch((err) => {
        console.error(err);
    })
}

exports.getUserDetails = (req,res) => {
    let userData = {};
    db.doc(`/users/${req.user.userName}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return res.json(userData);
            }
        }).catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    })
}

exports.uploadImage = (req, res) => {
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
}