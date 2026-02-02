/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search, Filter, SortDesc, Bookmark } from "lucide-react";
import BlogCard from "@/features/blogs/components/Blog-card";
import SkeletonSavedPosts from "@/shared/components/skeletons/SkeletonSavedPosts";

export default function SavedBlogsList({ savedBlogs }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on search query
  const filteredBlogs = savedBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (savedBlogs.length === 0) 
    return (
      <div className="w-full max-w-4xl mx-auto">
        {[0, 1, 2].map((e) => <SkeletonSavedPosts key={e} />)}
      </div>
    );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-6 sticky top-4 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Saved Blogs
          </h2>

          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Filter size={20} />
            </button>
            <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <SortDesc size={20} />
            </button>
          </div>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
          <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No saved blogs found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {savedBlogs.length === 0
              ? "You haven't saved any blogs yet."
              : "No blogs match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}