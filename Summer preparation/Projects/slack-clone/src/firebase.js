import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCunkgTKjYBGkXPawypShkKQFo-0z9Hok0",
    authDomain: "slack-clone-c9bcf.firebaseapp.com",
    databaseURL: "https://slack-clone-c9bcf.firebaseio.com",
    projectId: "slack-clone-c9bcf",
    storageBucket: "slack-clone-c9bcf.appspot.com",
    messagingSenderId: "732189707788",
    appId: "1:732189707788:web:f7bcc37232639f06dd6829",
    measurementId: "G-WW73KZLWLH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;