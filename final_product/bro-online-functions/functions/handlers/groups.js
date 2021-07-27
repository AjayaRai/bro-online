const {db} = require('../util/admin')

exports.getAgroup = (req, res) => {
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
};

function getNameFromUserName(groupMembersUserName, groupMembers, res) {
    db
        .collection('users')
        .where('userName', 'in', groupMembersUserName)
        .get()
        .then((data) => {
            data.forEach((doc) => {
                groupMembers.push({
                    name: doc.data().namee,
                    userName: doc.data().userName,
                    imageUrl: doc.data().imageUrl
                })
            })
            return res.json(groupMembers);
        }).catch((err) => {
        console.error(err);
    })
}

exports.getUserGroups = (req, res) => {
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
                    docId: doc.id,
                    cardLocation: doc.data().cardLocation
                }

                interests.push(schema);
            });

            let updatedMyGrpArray = [];
            interests.sort(compare);

            for (let i=0; i<4; i++) {
                updatedMyGrpArray[i] = null;
                for (let j=0; j<interests.length; j++) {
                    if (i === interests[j].cardLocation) {
                        updatedMyGrpArray[i] = interests[j];
                    }
                }
            }

            return res.json(updatedMyGrpArray);
        }).catch((err) => {
        console.error(err);
    })
}

function compare ( a, b ) {
    if ( a.cardLocation < b.cardLocation ){
        return -1;
    }
    if ( a.cardLocation > b.cardLocation ){
        return 1;
    }
    return 0;
}

exports.addGroup = (req, res) => {
    const userName = req.user.userName;
    const newInterest = {
        name: req.body.name,
        cardLocation: req.body.cardLocation
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
}

exports.getAllGroups = (req, res) => {
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
}

exports.addMemToGrp = (req, res) => {
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
                .collection('users')
                .doc(newMember.userName)
                .collection('interests')
                .get()
                .then((data) => {
                    let interests = [];

                    data.forEach((doc) => {
                        let schema = {
                            name: doc.data().name,
                            docId: doc.id,
                            cardLocation: doc.data().cardLocation
                        }

                        interests.push(schema);
                    });

                    let updatedMyGrpArray = [];
                    interests.sort(compare);

                    for (let i=0; i<4; i++) {
                        updatedMyGrpArray[i] = null;
                        for (let j=0; j<interests.length; j++) {
                            if (i === interests[j].cardLocation) {
                                updatedMyGrpArray[i] = interests[j];
                            }
                        }
                    }

                    let indexOfNull = updatedMyGrpArray.indexOf(null);

                    db
                        .doc(`/groups/${docId}`)
                        .get()
                        .then((data) => {
                            let newInterest = data.data().name;
                            db
                                .doc(`users/${newMember.userName}/interests/${docId}`)
                                .set({
                                    cardLocation: indexOfNull,
                                    name: newInterest
                                })
                                .then(() => {
                                    return res.json("SUCCESS");
                                }).catch((err) => {
                                console.error(err);
                            })
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
}

exports.removeMemFromGrp = (req, res) => {
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
}

exports.deleteGroup = (req, res) => {
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
        })
        .then(() => {
            db
                .collection('groups')
                .doc(req.params.groupId)
                .collection('messages')
                .get()
                .then((data_2) => {
                    data_2.forEach((doc_2) => {
                        batch.delete(db.doc(`/groups/${req.params.groupId}/messages/${doc_2.id}`))
                    })

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
        .catch((err) => {
            console.error(err);
        })
}

function sleeep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.getGrpBio = (req, res) => {
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
}

exports.addUpdateGrpBio = (req, res) => {
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
}