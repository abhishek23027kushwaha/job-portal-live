// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 1. Auth imports add kiye

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4bTJKvb6BklH0poSLCxwJC92BUzAxl14",
  authDomain: "job-portal-live-7d5a6.firebaseapp.com",
  projectId: "job-portal-live-7d5a6",
  storageBucket: "job-portal-live-7d5a6.firebasestorage.app",
  messagingSenderId: "146784206805",
  appId: "1:146784206805:web:9e2e15ccf3a56e8561075c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Auth aur Provider ko initialize karein
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;


