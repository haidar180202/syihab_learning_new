
// import AppRoutes from './routes/AppRoutes'
// // import { AdSense } from './components'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//    <AppRoutes/>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/user/Dashboard';
import CourseList from './pages/course/CourseList';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="course" element={<CourseList />} />
          </Route>
        </Routes>
      </Router>

    </AuthProvider>
  );
};

export default App;

