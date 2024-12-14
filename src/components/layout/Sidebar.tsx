import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-light border-end" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="p-3">
        <h4 className="text-primary fw-bold">Syihab Learning</h4>
        <ul className="list-unstyled mt-4">
          <li className="mb-3">
            <Link to="/dashboard" className="text-decoration-none text-dark">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/courses" className="text-decoration-none text-dark">
              <i className="bi bi-book me-2"></i> Courses
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/profile" className="text-decoration-none text-dark">
              <i className="bi bi-person me-2"></i> Profile
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/settings" className="text-decoration-none text-dark">
              <i className="bi bi-gear me-2"></i> Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
