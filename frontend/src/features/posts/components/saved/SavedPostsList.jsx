/* eslint-disable react/prop-types */
import { useState } from "react"
import { Search, Filter, SortDesc, Bookmark } from "lucide-react"
import SavedPostCard from "./SavedPOstsCard"
import SkeletonSavedPosts from "@/shared/components/skeletons/SkeletonSavedPosts";
import { Link } from "react-router-dom";

export default function SavedPostsList({ savedPosts, loading }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleUnsave = (id) => {
    console.log(id);
    // setPosts(posts.filter((post) => post.id !== id));
  };

  const filteredPosts = savedPosts.filter((post) =>
    post.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading) return <div className="w-full max-w-4xl mx-auto">{[0,2,3].map((e)=> <SkeletonSavedPosts key={e} />)}</div>;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-6 sticky top-4 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Saved Posts
          </h2>

          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search saved posts..."
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

      {filteredPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
          <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No saved posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {savedPosts.length === 0
              ? "You haven't saved any posts yet."
              : "No posts match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link to={`/post/${post.id}/0`} key={post.id}>
              <SavedPostCard post={post} onUnsave={handleUnsave} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
