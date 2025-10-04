import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/services/authService';
import { debugDatabase } from '@/services/debugService';


export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect based on their role
    if (user) {
      const redirectUrl = authService.getRedirectUrl(user.role);
      navigate(redirectUrl, { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    
    try {
      // Debug: Check database connection and user existence
      console.log('=== LOGIN DEBUG START ===');
      await debugDatabase.testDatabaseConnection();
      await debugDatabase.findUserByEmail(email);
      console.log('=== LOGIN DEBUG END ===');
      
      const result = await authService.login({ email, password });
      
      if (result.success && result.user) {
        // Store user in Redux
        dispatch(setCredentials({ 
          user: result.user, 
          token: 'supabase-session' // Simple token for now
        }));
        
        // Get redirect URL based on user role
        const redirectUrl = authService.getRedirectUrl(result.user.role);
        
        // Show success message with role information
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${result.user.name}! Redirecting to ${result.user.role} dashboard...`,
        });
        
        console.log(`Redirecting ${result.user.role} user to:`, redirectUrl);
        
        // Redirect based on user role
        navigate(redirectUrl, { replace: true });
        
      } else {
        // Show error message
        toast({
          title: 'Login Failed',
          description: result.error || 'Invalid credentials',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
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
          <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
          <CardDescription className="text-center">Use your work email to continue</CardDescription>
        </CardHeader>
        <CardContent>
          
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                autoComplete="email"
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
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link to="/signup" className="text-primary hover:underline">
              Need to create an account? Contact your administrator
            </Link>
          </div>
        </CardContent>
      </Card>
      
      
      
    </div>
  );
}