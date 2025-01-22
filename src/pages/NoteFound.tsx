import { Link } from 'react-router-dom'

const NoteFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-3">
      <div className="text-center container">
        <img
          src={``}
          alt="404 illustration"
          className="mx-auto mb-4 mb-md-5 img-fluid"
          style={{ maxWidth: "500px", width: "100%" }}
        />

        <h1 className="fw-bold mb-2 mb-md-3 fs-2 fs-md-1">Page Missing!</h1>

        <p className="text-secondary mb-4 fs-5 fs-md-4 px-2">
          Page not found. Please check again!
        </p>

        <Link to="/dashboard" className="btn btn-primary px-4 py-2">
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default NoteFound