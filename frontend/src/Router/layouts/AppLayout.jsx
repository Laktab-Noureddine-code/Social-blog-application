import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "@/shared/components/layout/NavBar";
import Sidebar from "@/shared/components/layout/Sidebar";
import ExpandableSearch from "@/shared/components/layout/SearchOverlay";

/**
 * AppLayout - Main application layout for authenticated users
 * 
 * This layout provides the main app shell with:
 * - Fixed navbar at the top
 * - Sidebar navigation on the left
 * - Mobile-responsive search overlay
 * - Main content area with proper margins
 * 
 * Note: Authentication is handled by the RequireAuth guard in the router,
 * not by this layout component.
 */
function AppLayout() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const isLoading = useSelector(state => state.isLoading);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <div className="sticky top-0 left-0 right-0 z-30">
        <Navbar setIsMobileOpen={setIsMobileOpen} />
      </div>

      {/* Fixed Sidebar */}
      <div className="fixed top-[70px] left-0 z-10">
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      {/* Mobile Search */}
      <div className="block sm:hidden mt-3">
        <ExpandableSearch />
      </div>

      {/* Main Content Area */}
      <main className="mt-[30px] md:ml-[250px] md:pr-[30px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AppLayout;
