import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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

/// to enable file uploads

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();