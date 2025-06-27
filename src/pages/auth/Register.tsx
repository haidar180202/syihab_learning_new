import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { name, email, password, role } = formData;

    if (!name || !email || password.length < 6 || !role) {
      setError("All fields are required, and password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role, // Save role to Firestore
        createdAt: new Date(),
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-5" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center text-primary mb-4">
          Welcome to <span className="fw-bold">Syihab Learning</span>
        </h2>
        <p className="text-muted text-center mb-4">Create your account and start your journey!</p>
        <form onSubmit={handleRegister}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-primary text-decoration-none fw-bold">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
