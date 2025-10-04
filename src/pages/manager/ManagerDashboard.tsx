import { Routes, Route, Navigate } from 'react-router-dom';
import ManagerHome from './ManagerHome';
import ApprovalsQueue from './ApprovalsQueue';
import TeamExpenses from './TeamExpenses';

export default function ManagerDashboard() {
  return (
    <Routes>
      <Route index element={<ManagerHome />} />
      <Route path="approvals" element={<ApprovalsQueue />} />
      <Route path="team-expenses" element={<TeamExpenses />} />
      <Route path="*" element={<Navigate to="/manager" replace />} />
    </Routes>
  );
}