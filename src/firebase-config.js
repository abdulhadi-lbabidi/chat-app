// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcvS-6_oU3w4pENKFUuen22CLfMNMHvt0",
    authDomain: "chatapp-e6f02.firebaseapp.com",
    projectId: "chatapp-e6f02",
    storageBucket: "chatapp-e6f02.appspot.com",
    messagingSenderId: "528630068939",
    appId: "1:528630068939:web:726ff8c787fa0b86230d4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const proivder = new GoogleAuthProvider();
export const db = getFirestore(app);