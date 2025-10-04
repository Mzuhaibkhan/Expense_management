import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';

function App() {
  const { user } = useAppSelector((state) => state.auth);

  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  const getDashboardByRole = () => {
    if (!user) return <LandingPage />; // fallback (not usually reached now because used only inside layout index)
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'manager':
        return <Navigate to="/manager" replace />;
      case 'employee':
        return <Navigate to="/employee" replace />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupPage />} />
        <Route path="/" element={<Layout />}>
          {/* If logged in, redirect to role dashboard. If not, Layout will render LandingPage itself. */}
          <Route index element={user ? getDashboardByRole() : <LandingPage />} />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;