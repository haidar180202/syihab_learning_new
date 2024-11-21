import React from 'react';

const CourseDetail: React.FC = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="bg-dark text-white p-5 rounded shadow-sm">
        <h2>Course Title</h2>
        <p>Learn the basics of web development.</p>
      </div>

      {/* Content */}
      <div className="row my-4">
        {/* Video Section */}
        <div className="col-md-8">
          <div className="embed-responsive embed-responsive-16by9 mb-4">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allowFullScreen
              title="Course Video"
            ></iframe>
          </div>
          <h4>Course Description</h4>
          <p>
            This course will teach you the fundamentals of HTML, CSS, and JavaScript, enabling you to create interactive websites.
          </p>
        </div>

        {/* Sidebar */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5>Instructor</h5>
              <p>John Doe</p>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Course Progress</h5>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: '50%' }}
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  50%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
