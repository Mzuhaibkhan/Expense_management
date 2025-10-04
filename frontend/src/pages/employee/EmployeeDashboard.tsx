import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeHome from './EmployeeHome';
import SubmitExpense from './SubmitExpense';
import ExpenseHistory from './ExpenseHistory';

export default function EmployeeDashboard() {
  return (
    <Routes>
      <Route index element={<EmployeeHome />} />
      <Route path="submit-expense" element={<SubmitExpense />} />
      <Route path="expenses" element={<ExpenseHistory />} />
      <Route path="*" element={<Navigate to="/employee" replace />} />
    </Routes>
  );
}