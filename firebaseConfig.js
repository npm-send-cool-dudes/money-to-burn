// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'fakeapikey',
  authDomain: 'money-to-burn.firebaseapp.com',
  databaseURL: 'https://money-to-burn.firebaseio.com',
  projectId: 'money-to-burn',
  storageBucket: 'money-to-burn.appspot.com',
  messagingSenderId: '259957476230',
  appId: '1:259957476230:web:f7e68b8436ffd6bcbbba07',
  measurementId: 'G-2JNBJLSCLD',
};

console.log(firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;
