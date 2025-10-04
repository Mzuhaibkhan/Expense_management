import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { useToast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { users } = useAppSelector((state: any) => state.users);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
  const user = users.find((u: any) => u.email === email);
      
      if (user) {
        dispatch(setCredentials({ user, token: 'mock-token-' + user.id }));
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${user.name}!`,
        });
        
        // Navigate based on role
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'manager':
            navigate('/manager');
            break;
          case 'submanager':
            navigate('/submanager');
            break;
          case 'employee':
            navigate('/employee');
            break;
        }
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              E
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <Link to="/signup" className="text-primary hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
            <p className="text-xs">Admin: admin@company.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}