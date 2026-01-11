import { Outlet } from 'react-router-dom';

/**
 * AuthLayout - Layout for authentication pages (login, register, forgot-password)
 * 
 * This layout provides a clean, centered container without the main app's
 * sidebar and navbar. It's designed for guest-only pages.
 * 
 * Features:
 * - Full-height centered layout
 * - Clean background
 * - No navigation distractions
 */
function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Optional: You can add a minimal header here if needed */}
      <main className="flex items-center justify-center min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
