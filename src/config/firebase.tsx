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

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage"; // Import Firebase Storage

// const firebaseConfig = {
//   apiKey: "AIzaSyBHPUvGaFhDMzAkc_HfWyOo8s1u4Na67Qo",
//   authDomain: "syihablearningapp-2024.firebaseapp.com",
//   projectId: "syihablearningapp-2024",
//   storageBucket: "syihablearningapp-2024.appspot.com", // Perbaikan storage bucket
//   messagingSenderId: "967892086766",
//   appId: "1:967892086766:web:828fc245d76fc09443a8ff",
//   measurementId: "G-8B32JBJ4XM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Initialize Auth
// const auth = getAuth(app);

// // Initialize Storage
// const storage = getStorage(app); // Storage digunakan untuk upload gambar

// export { db, auth, storage };
