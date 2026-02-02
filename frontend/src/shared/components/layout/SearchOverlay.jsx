import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "@/lib/api";

export default function ExpandableSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => setIsFocused(true);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${activeTab}`);
      setIsFocused(false);
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setResults(null);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/api/search/propositions/${user.id}`, {
        content: value,
      });

      setResults(response.data);
    } catch (error) {
      console.error("Search fetch error:", error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults(null);
    inputRef.current?.focus();
  };

  const handleSeeMore = (category) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${category}`);
    setIsFocused(false);
  };

  const renderSection = (
    label,
    items,
    route,
    iconKey = "name",
    idKey = "id",
    imageKey = "image"
  ) => (
    <div className="py-2">
      <div className="px-4 py-1 font-medium text-sm text-gray-500">{label}</div>
      {items.map((item) => {
        const link =
          route === "posts"
            ? `/post/${item[idKey]}/0`
            : `/${route}/${item[idKey]}`;

        return (
          <Link
            key={`${route}-${item[idKey]}`}
            to={link}
            className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => setIsFocused(false)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 overflow-hidden">
              {item[imageKey] ? (
                <img
                  src={item[imageKey]}
                  alt={item[iconKey]}
                  className="w-full h-full object-cover"
                />
              ) : (
                item[iconKey]?.charAt(0).toUpperCase() || "?"
              )}
            </div>
            <div>
              <div className="font-medium">{item[iconKey]}</div>
              <div className="text-xs text-gray-500">{label.slice(0, -1)}</div>
            </div>
          </Link>
        );
      })}
      {results?.counts?.[`${route}_count`] > 0 && (
        <div className="px-4 py-2">
          <button
            onClick={() => handleSeeMore(route)}
            className="text-sm text-blue-500 hover:underline"
          >
            View {results.counts[`${route}_count`]} more {label.toLowerCase()}
          </button>
        </div>
      )}
    </div>
  );


  const tabs = ["all", "posts", "groups", "users", "pages", "blogs"];

  return (
    <div className="relative w-full max-w-xl mx-auto max-sm:mt-2" ref={searchRef}>
      <div className={`bg-gray-100 rounded-2xl transition-all duration-300 ease-in-out ${isFocused ? "rounded-b-none shadow-lg" : ""}`}>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            className="block w-full pl-10 pr-10 py-3 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="absolute right-3 p-1 rounded-full hover:bg-gray-200">
              <X size={18} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {isFocused && (
        <div className="absolute left-0 right-0 bg-white rounded-b-lg shadow-lg border-t border-gray-200 overflow-hidden z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex p-2 gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-full transition ${activeTab === tab ? "bg-gray-200 font-medium" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <Loader2 size={24} className="animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : !results ? (
            searchQuery && (
              <div className="px-4 py-8 text-center text-gray-500">
                Start typing to search
              </div>
            )
          ) : (
            <div className="divide-y divide-gray-100">
              {(activeTab === "all" || activeTab === "posts") && results.posts?.length > 0 &&
                renderSection("Posts", results.posts, "posts", "content", "id", null)}

              {(activeTab === "all" || activeTab === "groups") && results.groups?.length > 0 &&
                renderSection("Groups", results.groups, "groupes")}

              {(activeTab === "all" || activeTab === "users") && results.users?.length > 0 &&
                renderSection("Users", results.users, "profile")}

              {(activeTab === "all" || activeTab === "pages") && results.pages?.length > 0 &&
                renderSection("Pages", results.pages, "page")}

              {(activeTab === "all" || activeTab === "blogs") && results.blogs?.length > 0 &&
                renderSection("Blogs", results.blogs, "blogs", "title")}
            </div>
          )}

          {!loading && results && (
            <>
              {(activeTab === "posts" && (!results.posts || results.posts.length === 0)) ||
              (activeTab === "groups" && (!results.groups || results.groups.length === 0)) ||
              (activeTab === "users" && (!results.users || results.users.length === 0)) ||
              (activeTab === "pages" && (!results.pages || results.pages.length === 0)) ||
              (activeTab === "blogs" && (!results.blogs || results.blogs.length === 0)) ? (
                <div className="p-4 text-sm text-gray-500 text-center">No results found.</div>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}
