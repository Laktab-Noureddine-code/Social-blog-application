import { Outlet } from "react-router-dom";

import { SidebarDesktop } from "./SidebarDesktop";
import { SidebarMobile } from "./SidebarMobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminPages, getFollowingPages, getMyPages } from "@/Redux/PagesSlice";
import api from "@/lib/api";


export default function PagesLayout() {
  const dispatcheEvent = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/pages/pages");
        const rest = response.data;
        dispatcheEvent(getAdminPages(rest.admin_pages));
        dispatcheEvent(getMyPages(rest.my_pages));
        dispatcheEvent(getFollowingPages(rest.following_pages));
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, dispatcheEvent]);


  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen relative ">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 z-10">
          {/* Search Input */}
          <div className="w-full lg:w-1/3 md:w-1/2">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-black dark:text-white text-center w-full md:w-auto md:ml-auto">
            Pages
          </h1>
        </header>

        <div className="sticky  top-0 left-0 right-0">
          <SidebarMobile />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
          <SidebarDesktop />
        </div>
      </div>
    </div>
  );
}
