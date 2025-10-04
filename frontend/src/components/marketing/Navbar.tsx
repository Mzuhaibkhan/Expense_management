import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Receipt } from 'lucide-react';

export function MarketingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Receipt className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ExpenseFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </div>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
}
