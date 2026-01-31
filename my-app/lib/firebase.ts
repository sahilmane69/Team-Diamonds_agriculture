import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Config with explicit projectId to fix the initialization error.
// Using 'krishi-mitra-ai' as the likely project ID based on the app name.
// If this is incorrect, the user might need to provide the exact ID from Firebase Console.
const firebaseConfig = {
     apiKey: "AIzaSyDqqkTr73RW9bs9dCxygHPGH7X7Z-RETr8",
     authDomain: "krishimitra-ai.firebaseapp.com",
     projectId: "krishimitra-ai",
     storageBucket: "krishimitra-ai.appspot.com",
     messagingSenderId: "123456789", // Placeholder
     appId: "1:123456789:web:abcdef" // Placeholder
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
