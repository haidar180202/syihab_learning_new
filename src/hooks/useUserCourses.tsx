import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// Tipe data untuk kursus
interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

// Hook untuk mengambil data kursus pengguna
export const useUserCourses = (userId: string | undefined) => {
  const [courses, setCourses] = useState<Course[]>([]); // Daftar kursus
  const [progress, setProgress] = useState<{ [key: string]: number }>({}); // Progress kursus
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!userId) return;

    const fetchCourses = async () => {
      setLoading(true); // Mulai loading
      setError(null); // Reset error state

      try {
        const coursesRef = collection(db, 'user_courses');
        const q = query(coursesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const userCourses: Course[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Course, 'id'>), // Pastikan tipe sesuai
        }));
        setCourses(userCourses);

        // Mengambil progress
        const progressData = userCourses.reduce((acc: { [key: string]: number }, course) => {
          acc[course.id] = course.progress || 0;
          return acc;
        }, {});
        setProgress(progressData);
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchCourses();
  }, [userId]);

  return { courses, progress, loading, error };
};
