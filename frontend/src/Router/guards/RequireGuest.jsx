import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Route Guard: RequireGuest
 * 
 * Protects guest-only routes (login, register, forgot-password).
 * If user is already authenticated, redirects them to /feed.
 * This prevents logged-in users from accessing the login page.
 * 
 * Usage in Router:
 * <Route element={<RequireGuest />}>
 *   <Route path="login" element={<LoginPage />} />
 *   <Route path="register" element={<RegisterPage />} />
 * </Route>
 */
function RequireGuest() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          <p className="text-gray-600 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, redirect to feed (or to the page they came from)
  if (isAuthenticated) {
    // Check if there's a saved location to redirect back to
    const from = location.state?.from?.pathname || '/feed';
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render the guest route (login/register)
  return <Outlet />;
}

export default RequireGuest;
