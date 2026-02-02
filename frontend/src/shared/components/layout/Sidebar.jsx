/* eslint-disable react/prop-types */
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useState, useEffect } from "react";
import {
  Home,
  User,
  MessageSquare,
  Users,
  TvMinimalPlay,
  Flag,
  Bookmark,
  X,
  NotebookText,
  LogOut,
  Settings,
} from "lucide-react";
import NavItem from "./NavItem";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/authSlice";

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const [activeItem, setActiveItem] = useState("home");
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileOpen]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Close mobile sidebar when item is clicked
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Call server to clear HttpOnly cookie and update Redux state
    dispatch(logoutUser());
    // Navigation will happen automatically via ProtectedRouter
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        style={{ zIndex: 900 }}
        className={`
        fixed md:static inset-y-0 left-0 z-50
        w-[250px] md:w-[220px] h-screen bg-white border-r border-gray-200 
        flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 z-50"}
      `}
      >
        {/* Mobile close button */}
        <div className="flex justify-end p-2 md:hidden">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="px-2 py-3">
          <NavItem
            icon={<Home size={18} />}
            label="Home"
            id="home"
            active={activeItem === "home"}
            onClick={() => handleItemClick("home")}
            to={"/feed"}
          />
          <NavItem
            icon={<User size={18} />}
            label="Profile"
            id="profile"
            active={activeItem === "profile"}
            onClick={() => handleItemClick("profile")}
            to={`/profile/${state.user.id}`}
          />
        </div>

        {/* Favorites Section */}
        <div className="mt-4">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Favorites
          </h3>
          <div className="px-2">
            <NavItem
              icon={<MessageSquare size={18} />}
              label="Messages"
              id="messages"
              active={activeItem === "messages"}
              onClick={() => handleItemClick("messages")}
              to={"/chat"}
            />
            <NavItem
              icon={<Users size={18} />}
              label="Friends"
              id="friends"
              active={activeItem === "friends"}
              onClick={() => handleItemClick("friends")}
              to={"/friends"}
            />
            <NavItem
              icon={<HiOutlineUserGroup size={23} />}
              label="Groups"
              id="groups"
              active={activeItem === "groups"}
              onClick={() => handleItemClick("groups")}
              to={"/groups/list"}
            />

            <NavItem
              icon={<Flag size={18} />}
              label="Pages"
              id="pages"
              active={activeItem.includes("/pages/")}
              onClick={() => handleItemClick("pages")}
              to={"/pages/mes-pages"}
            />
            <NavItem
              icon={<NotebookText size={18} />}
              label="Blogs"
              id="blogs"
              active={activeItem === "blog"}
              onClick={() => handleItemClick("blog")}
              to={"/blogs"}
            />
            <NavItem
              icon={<TvMinimalPlay size={18} />}
              label="watch"
              id="watch"
              active={activeItem === "watch"}
              onClick={() => handleItemClick("watch")}
              to={"/watch"}
            />

            <NavItem
              icon={<Bookmark size={18} />}
              label="Saved"
              id="saved"
              active={activeItem === "saved"}
              onClick={() => handleItemClick("saved")}
              to={"/saves"}
            />
            <NavItem
              icon={<Settings size={18} />}
              label="Settings"
              id="settings"
              active={activeItem === "settings"}
              onClick={() => handleItemClick("settings")}
              to={"/settings"}
            />
          </div>
        </div>

        {/* Groups Section */}
        {/* <div className="mt-4">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Groups
          </h3>
          <div className="px-2">
            <NavItem
              icon={<span className="text-lg">🐕</span>}
              label="Dog Lovers"
              id="dog-lovers"
              active={activeItem === "dog-lovers"}
              onClick={() => handleItemClick("dog-lovers")}
            />
            <NavItem
              icon={<span className="text-lg">🎮</span>}
              label="GamerZzZz"
              id="gamers"
              active={activeItem === "gamers"}
              onClick={() => handleItemClick("gamers")}
            />
            <NavItem
              icon={<span className="text-lg">✈️</span>}
              label="Travel Girls"
              id="travel"
              active={activeItem === "travel"}
              onClick={() => handleItemClick("travel")}
            />
          </div>
        </div> */}

        {/* Logout Section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div onClick={handleLogout} className="cursor-pointer">
            <NavItem
              icon={<LogOut size={18} />}
              label="Logout"
              id="logout"
              active={activeItem === "logout"}
              onClick={() => handleItemClick("logout")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
