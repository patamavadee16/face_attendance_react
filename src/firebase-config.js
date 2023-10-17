import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGyUip1JGkYSkmV-4DmF4TUmn6sUj7meA",
  authDomain: "faceproject-77fdf.firebaseapp.com",
  projectId: "faceproject-77fdf",
  storageBucket: "faceproject-77fdf.appspot.com",
  messagingSenderId: "1051401185432",
  appId: "1:1051401185432:web:0fdae5c52b30ef5ea308ed",
  measurementId: "G-HXXFMW2TS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);