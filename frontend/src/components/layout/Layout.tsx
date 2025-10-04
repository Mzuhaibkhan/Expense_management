import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppSelector } from '@/store/hooks';
import LandingPage from '@/pages/LandingPage';

export default function Layout() {
  const { user } = useAppSelector((s) => s.auth);

  // If no authenticated user, show marketing landing page (no app sidebar/nav)
  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}