const functions = require('firebase-functions');

const express = require('express');
const app = express();

const FBAuth = require('./util/fbAuth');

const {getAllScreams, postOneScream} = require('./handlers/screams');
const {signup, login, uploadImage} = require('./handlers/users');

// screams route
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.pst('/user/image', uploadImage);

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);