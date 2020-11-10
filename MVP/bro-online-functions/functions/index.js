const functions = require('firebase-functions');
const app = require('express')();
const {db, admin} = require('./util/admin');

const firebaseConfig = {
    apiKey: "AIzaSyBjMhI9UDp4RWf7tdeRf7dCwgZBMBVJh6E",
    authDomain: "bro-online.firebaseapp.com",
    databaseURL: "https://bro-online.firebaseio.com",
    projectId: "bro-online",
    storageBucket: "bro-online.appspot.com",
    messagingSenderId: "56379473014",
    appId: "1:56379473014:web:4719ca15086333f9277357",
    measurementId: "G-YEE82L7D40"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

// FBAuth == Firebase Auth
const FBAuth = (req, res, next) => {
    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            return db.collection('users')
                .where('userId', '==', req.user.uid)// TODO how to set the userId automatically on the DB?
                .limit(1)
                .get();
        })
        .then((data) => {
            req.user.userName = data.docs[0].data().userName;
            return next();
        })
        .catch((err) => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        })
}

app.get('/group', FBAuth, (req, res) => {
    db.collection('groups')
        .get()
        .then((data) => {
            let groups = [];
            data.forEach((docc) => {
                groups.push({
                    id: docc.id,
                    name: docc.data().name,
                    creator: docc.data().creator,
                    groupMembers: []
                })

                let groupMembersUserName = [];
                db.collection("groups")
                    .doc(docc.id)
                    .collection('groupMembers')
                    .get()
                    .then((data2) => {
                        data2.forEach((doc2) => {
                            groupMembersUserName.push(doc2.data().userName)
                        })
                        db.collection('users')
                            .where('userName', 'in', groupMembersUserName)
                            .get()
                            .then((data) => {
                                data.forEach((doc4) => {
                                    groups[0].groupMembers.push({
                                        name: doc4.data().name
                                    })
                                })
                                return res.json(groups);
                            })
                    }).catch((err) => {
                        console.error(err);
                })
            })
        }).catch((err) => {
            console.error(err);
    })
})

// Signup route
/*app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
    }

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
                userId
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
})*/

app.post('/login', (req,res) => {
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
});

app.get('/interest', FBAuth, (req, res) => {
    db.collection('interests')
        .get()
        .then((data) => {
            let interests = [];

            data.forEach((doc) => {
                interests.push({
                    name: doc.data().name
                })
            })

            return res.json(interests);
        }).catch((err) => {
            console.error(err);
        })
})

app.get('/users', (req,res) => {
    db.collection('users')
        .get()
        .then((data) => {
            let jpt = {};
            let users = [];

            data.forEach((doc) => {
                users.push({
                    name: doc.data().name,
                    userName: doc.data().userName,
                })
            })

            jpt.credentials = users[0];
            return res.json(jpt);
        }).catch((err) => {
            console.error(err);
        })
})

exports.api = functions.region('europe-west2').https.onRequest(app);
