import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHPUvGaFhDMzAkc_HfWyOo8s1u4Na67Qo",
  authDomain: "syihablearningapp-2024.firebaseapp.com",
  projectId: "syihablearningapp-2024",
  storageBucket: "syihablearningapp-2024.firebasestorage.app",
  messagingSenderId: "967892086766",
  appId: "1:967892086766:web:828fc245d76fc09443a8ff",
  measurementId: "G-8B32JBJ4XM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

