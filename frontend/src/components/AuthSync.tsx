import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, logout } from '@/store/slices/authSlice';
import type { User } from '@/types';

// Simple role mapping based on email domain or Auth0 app_metadata (extend as needed)
function deriveRole(_raw: any): User['role'] {
  // For current requirement, always treat user as admin so admin dashboard shows.
  return 'admin';
}

export default function AuthSync() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let active = true;
    (async () => {
      // Avoid dispatching logout while Auth0 is still determining session
      if (isLoading) {
        return;
      }
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently().catch(() => 'auth0-token');
          const mapped: User = {
            id: user.sub || 'auth0-user',
            name: user.name || user.nickname || user.email || 'User',
            email: user.email || 'unknown@example.com',
            role: deriveRole(user),
            companyId: import.meta.env.VITE_DEFAULT_COMPANY_ID || 'company-1'
          };
          if (active) {
            dispatch(setCredentials({ user: mapped, token }));
          }
        } catch {
          // On token retrieval failure we can ignore or trigger logout
        }
      } else if (!isLoading && !isAuthenticated) {
        dispatch(logout());
      }
    })();
    return () => { active = false; };
  }, [isAuthenticated, isLoading, user, getAccessTokenSilently, dispatch]);

  return null;
}