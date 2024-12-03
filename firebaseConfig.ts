// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmrNN0X4vl2VsUUcD1mrQwxFYYrSHhKI0",
  authDomain: "e-books-app-5dd46.firebaseapp.com",
  projectId: "e-books-app-5dd46",
  storageBucket: "e-books-app-5dd46.firebasestorage.app",
  messagingSenderId: "269756971217",
  appId: "1:269756971217:web:fa4a48609e0e8b568f2df0",
  measurementId: "G-HS3EPNJ9SN"
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig); 
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP); 

