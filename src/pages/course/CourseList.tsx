// src/pages/Course/CourseList.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';


interface Course {
  id: string;
  title: string;
  description: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, 'courses');
      const courseSnapshot = await getDocs(coursesCollection);
      const courseList = courseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];

      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`}>{course.title}</Link>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
