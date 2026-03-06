// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 1. Auth imports add kiye

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqAF4YiTv70W5h87oOrN5reuEObgoI-a0",
  authDomain: "job-portal-e20a0.firebaseapp.com",
  projectId: "job-portal-e20a0",
  storageBucket: "job-portal-e20a0.firebasestorage.app",
  messagingSenderId: "568582233649",
  appId: "1:568582233649:web:3466ace50a214c72873f10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Auth aur Provider ko initialize karein
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;