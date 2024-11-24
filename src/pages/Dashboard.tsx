import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";


const Dashboard: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="container my-5">
          <h2 className="text-center mb-4">Welcome to Dashboard</h2>
          {/* Content here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
