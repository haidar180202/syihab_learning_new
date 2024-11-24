import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ambil role dari Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Redirect berdasarkan role
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "user") {
          navigate("/dashboard");
        } else {
          setError("Unauthorized role.");
        }
      } else {
        setError("User data not found.");
      }
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-5" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="text-primary">Welcome Back!</h2>
          <p className="text-muted">
            Login to continue to <span className="fw-bold">Syihab Learning</span>
          </p>
        </div>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-primary fw-bold text-decoration-none">Register</a>
        </p>
        <p className="text-center mt-2">
          <a href="/forgot-password" className="text-muted text-decoration-none">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
