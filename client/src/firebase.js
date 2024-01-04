// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_GHE9wLbkf8Agl39N9yE2y4cnmzDVlwk",
  authDomain: "nitw-nexus.firebaseapp.com",
  projectId: "nitw-nexus",
  storageBucket: "nitw-nexus.appspot.com",
  messagingSenderId: "1016121703230",
  appId: "1:1016121703230:web:0123296cb398b2f40a8a6f",
  measurementId: "G-NP5DJYK11Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();