import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAi87r3Wl4ikjZzN139cSGzPbzcwzRjXg4",
  authDomain: "smartliving-image-1af06.firebaseapp.com",
  projectId: "smartliving-image-1af06",
  storageBucket: "smartliving-image-1af06.appspot.com",
  messagingSenderId: "967926404369",
  appId: "1:967926404369:web:239d5e6692920406cbe8b0",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor auth untuk digunakan di tempat lain
export const auth = getAuth(app);
