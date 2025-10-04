import { Routes, Route, Navigate } from 'react-router-dom';
import SubmanagerHome from './SubmanagerHome';
import ApprovalsQueue from './ApprovalsQueue';

export default function SubmanagerDashboard() {
  return (
    <Routes>
      <Route index element={<SubmanagerHome />} />
      <Route path="approvals" element={<ApprovalsQueue />} />
      <Route path="*" element={<Navigate to="/submanager" replace />} />
    </Routes>
  );
}
