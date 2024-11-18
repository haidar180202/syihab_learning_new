// src/services/progressService.ts

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const updateProgress = async (userId: string, courseId: string, progress: number) => {
  try {
    const progressRef = doc(db, 'progress', `${userId}_${courseId}`);
    await setDoc(progressRef, { userId, courseId, progress }, { merge: true });
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};
