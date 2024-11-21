import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="container my-5 d-flex justify-content-center">
      {/* Card with Bootstrap shadow and animation */}
      <div
        className="card shadow-lg p-4 animate__animated animate__fadeIn"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        {/* Header with app name */}
        <div className="text-center mb-4">
          <h3 className="display-4 text-primary">Syihab Learning</h3>
          <h3 className="text-muted">Login to Your Account</h3>
        </div>

        {/* Form Section */}
        <form>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>

          {/* Forgot Password Link */}
          <div className="d-flex justify-content-between mb-3">
            <a href="/forgot-password" className="text-muted">Forgot Password?</a>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center mt-3">
          Don't have an account? <a href="/auth/register" className="fw-bold text-primary">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
