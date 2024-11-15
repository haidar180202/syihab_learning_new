// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
    <Link to="/" style={{ margin: '0 15px' }}>Home</Link>
    <Link to="/courses" style={{ margin: '0 15px' }}>Courses</Link>
    <Link to="/profile" style={{ margin: '0 15px' }}>Profile</Link>
  </nav>
);

export default Navbar;
