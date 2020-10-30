const functions = require('firebase-functions');
const app = require('express')();
const {db} = require('./util/admin');

app.get('/group', (req, res) => {
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
                    db.collection("groups")
                        .doc(docc.id)
                        .collection('groupMembers')
                        .get()
                        .then((data2) => {
                            data2.forEach((doc2) => {
                                groups[0].groupMembers.push({
                                    userName: doc2.data().userName,
                                })
                            })
                            return res.json(groups);
                        }).catch((err) => {
                            console.error(err)
                    })
                })



        }).catch((err) => {
            console.error(err);
    })

})

exports.api = functions.region('europe-west2').https.onRequest(app);
