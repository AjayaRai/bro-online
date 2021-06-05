const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
const {db} = require('./util/admin');

const config = require("./util/config");
const firebase = require('firebase');
firebase.initializeApp(config);

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
    db.doc(`/users/${req.user.userName}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return res.json(userData);
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
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

app.get('/groups', FBAuth, (req, res) => {
    const groups = [];

    db
        .collection('groups')
        .get()
        .then((data) => {
            data.forEach((doc) => {
                groups.push({
                    name: doc.data().name,
                    docId: doc.id
                })
            })
            res.json(groups);
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

app.delete('/group/:groupId', FBAuth, (req, res) => {
    const batch = db.batch();

    db
        .collection('groups')
        .doc(req.params.groupId)
        .collection('groupMembers')
        .get()
        .then((data) => {
            data.forEach((doc) => {
                batch.delete(db.doc(`/groups/${req.params.groupId}/groupMembers/${doc.id}`));
            })

            batch.delete(db.doc(`/groups/${req.params.groupId}`));

            batch
                .commit()
                .then(() => {
                    sleeep(5000)
                        .then(() => {
                            res.json({message: "Deleted successfully the group " + req.params.groupId});
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((err) => {
            console.error(err);
        })
})


app.get('/group_bio/:docId', FBAuth, (req, res) => {
    db
        .doc(`/groups/${req.params.docId}`)
        .get()
        .then((data) => {
            console.log(data.data().bio);
            res.json({
                bio: data.data().bio
            });
        })
        .catch(err => {
            console.error(err);
        })
})

app.post('/group_bio/:docId', FBAuth, (req, res) => {
    db
        .doc(`groups/${req.params.docId}`)
        .update({
            bio: req.body.bio
        })
        .then(() => {
            res.json({msg: "SUCCESSFUL"});
        }).catch((err) => {
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

function sleeep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}