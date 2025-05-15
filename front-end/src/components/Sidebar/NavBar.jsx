/* eslint-disable react/prop-types */
import { Search, Bell, MessageSquare, Menu } from "lucide-react";
import ExpandableSearch from "./SearchOverlay";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({ setIsMobileOpen }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <h1>Loading...</h1>
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2">
      {/* Left - Logo and Menu */}
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="mr-3 p-1 rounded-md hover:bg-gray-100 md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-blue-600">Connected</h1>
      </div>

      {/* Center - Search */}
      <div className="hidden sm:block flex-1 max-w-xl mx-4 ">
        <ExpandableSearch />
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center">
        {/* Mobile search button */}
        <button className="p-1 text-gray-500 hover:text-gray-700 sm:hidden mr-2">
          <Search size={20} />
        </button>

        <Link
          to="/chat"
          className="p-1 text-gray-500 hover:text-gray-700 hidden sm:block"
        >
          <MessageSquare size={20} />
        </Link>
        <button className="p-1 text-gray-500 hover:text-gray-700 mx-2">
          <Bell size={20} />
        </button>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 hidden sm:inline mr-2">
            {user.name}
          </span>
          <img
            src="/images/img2.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
