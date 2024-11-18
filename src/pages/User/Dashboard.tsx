// src/pages/User/Dashboard.tsx

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserCourses } from '../../hooks/useUserCourses';
// import { useUserCourses } from '../../hooks/useUserCourses'; // Hook untuk mengambil data kursus pengguna

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, progress } = useUserCourses(user?.uid);

  return (
    <div>
      <h2>Welcome, {user?.displayName || 'User'}!</h2>
      <div>
        <h3>Your Courses</h3>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id}>
              <h4>{course.title}</h4>
              <p>Progress: {progress[course.id] || 0}%</p>
            </div>
          ))
        ) : (
          <p>You have not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
