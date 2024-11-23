import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <h5>Dashboard</h5>
      <button className="btn btn-light btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
