
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// https://charming-scarab-378023-default-rtdb.europe-west1.firebasedatabase.app/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBd0qs1JNbBjIgiitgR9wsiivYkfRzU1d0",
    authDomain: "charming-scarab-378023.firebaseapp.com",
    databaseURL: "https://charming-scarab-378023-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "charming-scarab-378023",
    storageBucket: "charming-scarab-378023.appspot.com",
    messagingSenderId: "265999340311",
    appId: "1:265999340311:web:605b781017a338b89a9d52",
    measurementId: "G-M4M3RBBHC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const database = getDatabase();

export const getData = ref(database, "data/" + "message");

// onValue(getData, (snap) => {
//     const dataMessage = snap.val();
//     return dataMessage
// });