import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

/* eslint-disable */
// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOR5BrBP8hz59WjGR1cvRPag0cNE9vdZs',
  authDomain: 'music-23454.firebaseapp.com',
  projectId: 'music-23454',
  storageBucket: 'music-23454.appspot.com',
  appId: '1:606959899456:web:068f8525e300e058af20a5',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
