import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard</h2>

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
    </div>
  );
};

export default Dashboard;
