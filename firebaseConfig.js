// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
console.log(firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .signInAnonymously()
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

export const db = firebase;
