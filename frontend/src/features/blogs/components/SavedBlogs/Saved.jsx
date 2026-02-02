import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";

function Saved() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/saves/blogs" ? "blogs" : "posts"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "blogs") {
      navigate("/saves/blogs");
    } else {
      navigate("/saves/posts");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Saved Content
        </h1>
        <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => handleTabChange("posts")}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors ${activeTab === "posts"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <Bookmark size={20} />
            Saved Posts
          </button>
          <button
            onClick={() => handleTabChange("blogs")}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors ${activeTab === "blogs"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <BookmarkCheck size={20} />
            Saved Blogs
          </button>
        </div>
      </div>

      {/* Outlet for the child routes */}
      <Outlet />
    </div>
  );
}

export default Saved;
