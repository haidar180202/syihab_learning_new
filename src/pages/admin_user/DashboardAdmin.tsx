import React from "react";

const DashboardAdmin: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-grow-1">

        {/* Dashboard Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="fs-4 fw-bold text-primary">1,245</p>
                <p className="card-text">Active users registered</p>
                <button className="btn btn-outline-primary btn-sm">View details</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Courses</h5>
                <p className="fs-4 fw-bold text-success">87</p>
                <p className="card-text">Available courses</p>
                <button className="btn btn-outline-success btn-sm">Manage courses</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">New Signups</h5>
                <p className="fs-4 fw-bold text-info">48</p>
                <p className="card-text">This month</p>
                <button className="btn btn-outline-info btn-sm">View signups</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Revenue</h5>
                <p className="fs-4 fw-bold text-warning">$12,450</p>
                <p className="card-text">Last 30 days</p>
                <button className="btn btn-outline-warning btn-sm">View report</button>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Table */}
        <div className="card shadow-sm">
          <div className="card-header">
            <h5>User Activity Overview</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td>
                    <span className="badge bg-success">Active</span>
                  </td>
                  <td>2025-06-27</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>Instructor</td>
                  <td>
                    <span className="badge bg-warning">Pending</span>
                  </td>
                  <td>2025-06-20</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Michael Lee</td>
                  <td>michael@example.com</td>
                  <td>Student</td>
                  <td>
                    <span className="badge bg-secondary">Inactive</span>
                  </td>
                  <td>2025-05-30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
