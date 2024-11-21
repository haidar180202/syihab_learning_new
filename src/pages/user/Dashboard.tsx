import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <h4 className="text-primary">BelajarApp</h4>
          <ul className="list-unstyled mt-4">
            <li className="mb-3">
              <a href="/dashboard" className="text-decoration-none text-dark">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </a>
            </li>
            <li className="mb-3">
              <a href="/courses" className="text-decoration-none text-dark">
                <i className="bi bi-book me-2"></i> Courses
              </a>
            </li>
            <li className="mb-3">
              <a href="/profile" className="text-decoration-none text-dark">
                <i className="bi bi-person me-2"></i> Profile
              </a>
            </li>
            <li className="mb-3">
              <a href="/settings" className="text-decoration-none text-dark">
                <i className="bi bi-gear me-2"></i> Settings
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <header className="bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
          <h5>Dashboard</h5>
          <button className="btn btn-light btn-sm">Logout</button>
        </header>

        {/* Dashboard Content */}
        <main className="container my-5">
          <h2 className="text-center mb-4">Welcome to Dashboard</h2>

          {/* Stats Section */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm text-center p-3">
                <h4>Enrolled Courses</h4>
                <p className="display-4 text-primary">5</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm text-center p-3">
                <h4>Completed Courses</h4>
                <p className="display-4 text-success">3</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm text-center p-3">
                <h4>Total Hours</h4>
                <p className="display-4 text-info">120</p>
              </div>
            </div>
          </div>

          {/* Current Courses */}
          <h3 className="mb-3">Your Current Courses</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5>Web Development 101</h5>
                  <p>Learn HTML, CSS, and JavaScript.</p>
                  <button className="btn btn-primary btn-sm">Continue</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5>UI/UX Design Basics</h5>
                  <p>Master the fundamentals of design principles.</p>
                  <button className="btn btn-primary btn-sm">Continue</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
