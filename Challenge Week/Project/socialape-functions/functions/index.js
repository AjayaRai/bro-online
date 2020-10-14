const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
admin.initializeApp();

var firebaseConfig = {
    apiKey: "AIzaSyATlJghJZNpKLucR4u1euaCZzT4Ur-HLiM",
    authDomain: "socialape-33bb2.firebaseapp.com",
    databaseURL: "https://socialape-33bb2.firebaseio.com",
    projectId: "socialape-33bb2",
    storageBucket: "socialape-33bb2.appspot.com",
    messagingSenderId: "263607830250",
    appId: "1:263607830250:web:a25161d9a89fd20cc57993",
    measurementId: "G-ZYZ2HTWXKE"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

app.get('/screams', (req, res) => {
    admin
        .firestore()
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                })
            })

            return res.json(screams);
        }).catch(err => console.error(err))
})

app.post('/scream', (req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully`})
        }).catch(err => {
            res.status(500).json({error: 'something went wrong'})
        console.error(err);
    })
})

// Signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    }

    // TODO validate data

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            return res.status(201).json({message: `user ${data.user.uid} signed up successfully`});
        }).catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
    })
})

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);