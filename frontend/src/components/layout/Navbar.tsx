import { Bell, LogOut, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if service call fails
      dispatch(logout());
      navigate('/login', { replace: true });
    }
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <nav className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <button onClick={goHome} className="flex items-center gap-2 group focus:outline-none" aria-label="Go to landing page">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:scale-105 transition-transform">
            E
          </div>
            <span className="text-xl font-bold group-hover:text-primary transition-colors">Expense Manager</span>
        </button>
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3 border-l pl-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}