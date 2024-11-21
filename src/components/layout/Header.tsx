import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <header className="bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <h5>Dashboard</h5>
      <button className="btn btn-light btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
