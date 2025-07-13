import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import Main from './components/Main/Main';
import Test from './components/Test/Test';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminView from './pages/AdminView';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop/>
        <Routes>
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Sidebar/> */}
          <Route path="/admin" element={<PrivateRoute><AdminView /></PrivateRoute>} />
          <Route path="/test" element={<PrivateRoute><Test /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/main" element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

