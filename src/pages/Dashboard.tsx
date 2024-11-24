import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom"; // Menambahkan useNavigate untuk navigasi
import { signOut } from "firebase/auth";

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi programatik

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");

    if (storedRole) {
      // Jika ada role di localStorage, periksa apakah role tersebut cocok dengan data di database
      const checkRoleInDatabase = async () => {
        try {
          // Ambil UID pengguna yang sedang login dari localStorage (atau bisa menggunakan auth Firebase)
          const uid = localStorage.getItem("userUID");
          if (uid) {
            // Ambil data pengguna dari Firestore berdasarkan UID
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const dbRole = userData?.role;

              // Bandingkan role yang ada di localStorage dengan yang ada di database
              if (storedRole === dbRole) {
                setRole(dbRole); // Jika cocok, lanjutkan
              } else {
                // Jika tidak cocok, arahkan ke halaman login atau lakukan sesuatu
                localStorage.removeItem("userRole");
                localStorage.removeItem("userUID");
                navigate("/login"); // Redirect ke login
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
      // Jika tidak ada role di localStorage, arahkan ke login
      navigate("/login");
    }
  }, [navigate]); // Pastikan `navigate` juga termasuk dalam dependensi

  // Fungsi untuk logout
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
      return (
        <div>
          <h2 className="text-center mb-4">Loading...</h2>
        </div>
      );
    }

    if (role === "admin") {
      return (
        <div>
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          <p>Manage users, view analytics, and configure settings.</p>
        </div>
      );
    } else if (role === "user") {
      return (
        <div>
          <h2 className="text-center mb-4">User Dashboard</h2>
          <p>View your profile, track your activities, and explore resources.</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-center mb-4">Unauthorized</h2>
        </div>
      );
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="container my-5">
          {renderContent()}
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
