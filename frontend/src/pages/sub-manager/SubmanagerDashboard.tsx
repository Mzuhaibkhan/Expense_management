import { Routes, Route, Navigate } from 'react-router-dom';
import SubmanagerHome from '@/pages/sub-manager/SubmanagerHome';
import ApprovalsQueue from '@/pages/sub-manager/ApprovalsQueue';
import TeamExpenses from '@/pages/sub-manager/TeamExpenses';

export default function SubmanagerDashboard() {
  return (
    <Routes>
      <Route index element={<SubmanagerHome />} />
      <Route path="approvals" element={<ApprovalsQueue />} />
      <Route path="team-expenses" element={<TeamExpenses />} />
      <Route path="*" element={<Navigate to="/sub-manager" replace />} />
    </Routes>
  );
}