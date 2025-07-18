import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import Course from "./pages/Course";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CourseDetail from "./pages/CourseDetail";
import SubChapterDetail from "./pages/SubChapterDetail";
import NoteFound from "./pages/NoteFound";
import ProfileHome from "./pages/ProfileHome";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileHome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="courses"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />

        <Route
          path="course/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="course/:id/:subChapterId"
          element={
            <ProtectedRoute>
              <SubChapterDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="404"
          element={
            <ProtectedRoute>
              <NoteFound/>
            </ProtectedRoute>
          }
        />



      </Routes>
    </Router>
  );
};

export default App;
