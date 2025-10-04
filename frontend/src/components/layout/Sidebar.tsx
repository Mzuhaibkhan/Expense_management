import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  Settings, 
  DollarSign,
  ClipboardList,
  UserCog
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const { user } = useAppSelector((state) => state.auth);

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/approval-rules', icon: CheckSquare, label: 'Approval Rules' },
    { to: '/admin/settings', icon: Settings, label: 'Company Settings' },
  ];

  const employeeLinks = [
    { to: '/employee', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employee/submit-expense', icon: DollarSign, label: 'Submit Expense' },
    { to: '/employee/expenses', icon: FileText, label: 'My Expenses' },
  ];

  const managerLinks = [
    { to: '/manager', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/manager/approvals', icon: ClipboardList, label: 'Approvals Queue' },
    { to: '/manager/team-expenses', icon: UserCog, label: 'Team Expenses' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin':
        return adminLinks;
      case 'manager':
        return managerLinks;
      case 'employee':
        return employeeLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-card">
      <nav className="flex flex-col gap-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to.split('/').length === 2}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}