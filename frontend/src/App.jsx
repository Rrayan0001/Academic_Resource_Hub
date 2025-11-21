import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home'; // We might not need Home anymore if Login is the start
import Login from './pages/Login';
import Library from './pages/Library';
import ProjectDetails from './pages/ProjectDetails';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate landing page based on role
    if (user.role === 'student') return <Navigate to="/library" replace />;
    if (user.role === 'visitor') return <Navigate to="/library" replace />;
    if (user.role === 'teacher') return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Login is the starting page */}
          <Route path="/" element={<Login />} />
          
          {/* Protected Landing Page - Shown after login */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher', 'visitor']}>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/library"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher', 'visitor']}>
                <Layout>
                  <Library />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/project/:id"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher', 'visitor']}>
                <Layout>
                  <ProjectDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Layout>
                  <Upload />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
