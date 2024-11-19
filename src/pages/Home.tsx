import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="bg-light p-5 rounded shadow-sm text-center">
        <h1>Welcome to Syihab Learning</h1>
        <p className="lead">
          Unlock your potential with our video, audio, and text-based courses.
        </p>
        <a href="/courses" className="btn btn-primary btn-lg">
          Explore Courses
        </a>
      </div>

      {/* Categories Section */}
      <div className="my-5">
        <h2 className="text-center mb-4">Explore by Categories</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-4 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Programming</h5>
                <p className="card-text">Learn coding and development skills.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-4 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Design</h5>
                <p className="card-text">Master graphic and web design tools.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-info mb-4 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Marketing</h5>
                <p className="card-text">Grow your business with digital marketing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
