import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import DashboardAdmin from "./admin_user/DashboardAdmin";
import DashboardUser from "./user/DashboardUser";

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");

    if (storedRole) {
      const checkRoleInDatabase = async () => {
        try {
          const uid = localStorage.getItem("userUID");
          if (uid) {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const dbRole = userData?.role;

              if (storedRole === dbRole) {
                setRole(dbRole);
              } else {
                localStorage.removeItem("userRole");
                localStorage.removeItem("userUID");
                navigate("/login");
              }
            }
          }
        } catch (error) {
          console.error("Error checking role from database:", error);
        } finally {
          setLoading(false);
        }
      };

      checkRoleInDatabase();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have successfully logged out.");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userUID");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const renderContent = () => {
    if (loading) {
      return <h2 className="text-center mb-4">Loading...</h2>;
    }
    if (role === "admin") {
      return <DashboardAdmin />;
    }
    if (role === "user") {
      return <DashboardUser />;
    }
    return (
      <div>
        <h2 className="text-center mb-4">Unauthorized</h2>
      </div>
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="container my-5">
          {renderContent()}
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
