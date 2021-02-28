import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
//const auth = firebase.auth();
//const provider = new firebase.auth.GoogleAuthProvider();

//export {auth, provider};
export default db;