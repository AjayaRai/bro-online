import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCzathdUv4dd0hZwUl2XnkhyCeJZ1cRsbU",
    authDomain: "facebook-clone-7b7c4.firebaseapp.com",
    databaseURL: "https://facebook-clone-7b7c4.firebaseio.com",
    projectId: "facebook-clone-7b7c4",
    storageBucket: "facebook-clone-7b7c4.appspot.com",
    messagingSenderId: "27735128470",
    appId: "1:27735128470:web:655f02d18276df2cb505b7",
    measurementId: "G-07H12PRVGN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;