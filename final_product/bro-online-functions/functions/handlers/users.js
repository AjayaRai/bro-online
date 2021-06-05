const {db} = require('../util/admin')

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
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
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
                    userName: doc.data().userName
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