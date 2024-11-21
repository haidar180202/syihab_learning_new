import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h4 className="text-primary">BelajarApp</h4>
        <ul className="list-unstyled mt-4">
          <li className="mb-3">
            <button
              className="btn btn-link text-decoration-none text-dark w-100 text-start"
              onClick={() => navigate('/dashboard')}
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </button>
          </li>
          <li className="mb-3">
            <button
              className="btn btn-link text-decoration-none text-dark w-100 text-start"
              onClick={() => navigate('/courses')}
            >
              <i className="bi bi-book me-2"></i> Courses
            </button>
          </li>
          <li className="mb-3">
            <button
              className="btn btn-link text-decoration-none text-dark w-100 text-start"
              onClick={() => navigate('/profile')}
            >
              <i className="bi bi-person me-2"></i> Profile
            </button>
          </li>
          <li className="mb-3">
            <button
              className="btn btn-link text-decoration-none text-dark w-100 text-start"
              onClick={() => navigate('/settings')}
            >
              <i className="bi bi-gear me-2"></i> Settings
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
