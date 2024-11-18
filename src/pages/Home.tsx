// src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Online Learning</h1>
      <p>Choose your course and start learning</p>
      <Link to="/courses">View Courses</Link>
    </div>
  );
};

export default Home;
