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

app.get('/groups/:docId', FBAuth, (req, res) => {
    let groupMembers = [];
    let groupMembersUserName = [];
    db
        .doc(`/groups/${req.params.docId}`)
        .collection("groupMembers")
        .get()
        .then((data) => {
            data.forEach((doc) => {
                groupMembersUserName.push(doc.data().userName)
            })

            if (groupMembersUserName.length !== 0) {
                getNameFromUserName(groupMembersUserName, groupMembers, res);
            }
        }).catch((err) => {
            console.error(err);
    })
})

function getNameFromUserName(groupMembersUserName, groupMembers, res) {
    db
        .collection('users')
        .where('userName', 'in', groupMembersUserName)
        .get()
        .then((data) => {
            data.forEach((doc) => {
                groupMembers.push({
                    name: doc.data().namee,
                    userName: doc.data().userName
                })
            })
            return res.json(groupMembers);
        }).catch((err) => {
            console.error(err);
    })
}

// Signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        namee: req.body.namee
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
                userId,
                namee: newUser.namee
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
})

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


app.get('/get_interest', FBAuth, (req, res) => {
    const userName = req.user.userName;

    db
        .collection('users')
        .doc(userName)
        .collection('interests')
        .get()
        .then((data) => {
            let interests = [];

            data.forEach((doc) => {
                let schema = {
                    name: doc.data().name,
                    docId: doc.id
                }

                interests.push(schema);
            });

            return res.json(interests);
        }).catch((err) => {
            console.error(err);
        })
})

app.post('/add_interest', FBAuth, (req, res) => {
    const userName = req.user.userName;
    const newInterest = {
        name: req.body.name
    }
    let docId;

    db
        .collection('users')
        .doc(userName)
        .collection('interests')
        .add(newInterest)
        .then((doc) => {
            docId = doc.id;

            db
                .doc(`/groups/${docId}`)
                .set({
                    creator: userName,
                    name: newInterest.name
                })
                .then(() => {
                    db
                        .collection('groups')
                        .doc(docId)
                        .collection('groupMembers')
                        .doc(userName)
                        .set({
                            userName
                        })
                        .then(() => {
                            res.json("SUCCESS");
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({error: err.code});
                })
        })
        .catch(err => {
                res.status(500).json({error: 'something went wrong'})
                console.error(err);
            })
})

app.get('/user', FBAuth, (req,res) => {
    let userData = {};
    userData.credentials = {};
    userData.credentials.userName = {};

    userData.credentials.userName = req.user.userName;
    return res.json(userData);
})

app.get('/users', FBAuth, (req, res) => {
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
})


app.post('/add_member', FBAuth, (req, res) => {
    const docId = req.body.docId;
    const newMember = {
        userName: req.body.userName
    }

    db
        .collection('groups')
        .doc(docId)
        .collection('groupMembers')
        .doc(req.body.userName)
        .set(newMember)
        .then(() => {
            db
                .doc(`/groups/${docId}`)
                .get()
                .then((data) => {
                    let newInterest = data.data().name;
                    db
                        .doc(`users/${newMember.userName}/interests/${docId}`)
                        .set({
                            name: newInterest
                        })
                        .then(() => {
                            res.json("SUCCESS");
                        }).catch((err) => {
                            console.error(err);
                        })
                }).catch((err) => {
                    console.error(err);
            })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
})


app.delete('/group/:groupId/groupMember/:userId', FBAuth, (req, res) => {
    db
        .collection('groups')
        .doc(req.params.groupId)
        .collection('groupMembers')
        .doc(req.params.userId)
        .delete()
        .then(() => {
            res.json({message: "GroupMember deleted successfully"})
        })
        .catch((err) => {
            console.error(err);
        })
})

app.get('/t', (req, res) => {
    db
        .collection('test')
        .doc('testId')
        .get()
        .then((data) => {
            let x = data.data().name;

            res.json({name: x})
        })
        .catch((err) => {
            console.error(err);
        })
})

exports.api = functions.region('europe-west2').https.onRequest(app);

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