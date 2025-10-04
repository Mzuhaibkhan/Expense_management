import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import UserManagement from './UserManagement';
import ApprovalRules from './ApprovalRules';
import CompanySettings from './CompanySettings';

export default function AdminDashboard() {
  return (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="approval-rules" element={<ApprovalRules />} />
      <Route path="settings" element={<CompanySettings />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}