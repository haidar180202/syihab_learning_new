// src/services/apiService.ts

import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const coursesCollection = collection(db, "courses");

export const addCourse = async (course: { title: string; description: string }) => {
  try {
    const docRef = await addDoc(coursesCollection, course);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(coursesCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching courses: ", e);
  }
};
