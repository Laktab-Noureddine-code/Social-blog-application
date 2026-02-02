import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Route Guard: RequireAuth
 * 
 * Protects routes that require authentication.
 * If user is not authenticated, redirects to /login with the attempted location saved.
 * This allows redirecting back to the original page after successful login.
 * 
 * Usage in Router:
 * <Route element={<RequireAuth />}>
 *   <Route path="feed" element={<FeedPage />} />
 *   <Route path="settings" element={<SettingsPage />} />
 * </Route>
 */
function RequireAuth() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          <p className="text-gray-600 text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  // Save the attempted URL so we can redirect back after login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected route
  return <Outlet />;
}

export default RequireAuth;
