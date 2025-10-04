import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import SubmanagerDashboard from './pages/sub-manager/SubmanagerDashboard';
import Layout from './components/layout/Layout';
import { authService } from './services/authService';

function App() {
  const { user } = useAppSelector((state) => state.auth);

  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
    if (!user) {
      console.log('No user found, redirecting to login');
      return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(user.role)) {
      // Redirect to their appropriate dashboard if they don't have access
      const redirectUrl = authService.getRedirectUrl(user.role);
      console.log(`User role ${user.role} not in allowed roles [${allowedRoles.join(', ')}], redirecting to:`, redirectUrl);
      return <Navigate to={redirectUrl} replace />;
    }
    console.log(`User ${user.name} (${user.role}) accessing protected route`);
    return <>{children}</>;
  };

  const getDashboard = () => {
    if (!user) {
      console.log('No user found in getDashboard, redirecting to login');
      return <Navigate to="/login" replace />;
    }
    // Redirect to role-appropriate dashboard
    const redirectUrl = authService.getRedirectUrl(user.role);
    console.log(`Redirecting user ${user.name} (${user.role}) to dashboard:`, redirectUrl);
    return <Navigate to={redirectUrl} replace />;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? getDashboard() : <LoginPage />} />
        <Route path="/signup" element={user ? getDashboard() : <SignupPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={getDashboard()} />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
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
          
          <Route
            path="/sub-manager/*"
            element={
              <ProtectedRoute allowedRoles={['sub-manager']}>
                <SubmanagerDashboard />
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
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;