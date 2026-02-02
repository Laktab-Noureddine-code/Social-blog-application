import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const category = queryParams.get("category") || "all";

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await api.post(
          `/api/search/propositions/${user.id}`,
          { content: query, category }
        );
        setResults(response.data);
      } catch (err) {
        console.error("Error loading results:", err);
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, category, user.id]);

  const renderItem = (item, type) => {
    let path = "#";
    switch (type) {
      case "posts":
        path = `/post/${item.id}/0?type=apropos`;
        break;
      case "groups":
        path = `/groupes/${item.id}`;
        break;
      case "pages":
        path = `/page/${item.id}`;
        break;
      case "users":
        path = `/profile/${item.id}`;
        break;
      case "blogs":
        path = `/blogs/${item.id}`;
        break;
      default:
        break;
    }

    return (
      <Link
        to={path}
        key={`${type}-${item.id}`}
        className="flex items-center gap-3 p-4 border-b hover:bg-gray-50"
      >
        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center text-sm font-bold">
          {item.image ? (
            <img
              src={item.image}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            (item.name || item.title || item.content)?.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div className="font-medium">
            {item.name || item.title || item.content?.slice(0, 50)}
          </div>
          <div className="text-xs text-gray-500 capitalize">{type}</div>
        </div>
      </Link>
    );
  };

  const renderSection = (type, items) => (
    <div className="mb-6" key={type}>
      <h2 className="text-lg font-semibold mb-2 capitalize">{type}</h2>
      <div className="bg-white rounded shadow">
        {items.map((item) => renderItem(item, type))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Results for: "{query}"</h1>

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          <Loader2 size={24} className="animate-spin mx-auto mb-2" />
          Loading results...
        </div>
      ) : !results ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <>
          {category === "all" || category === "posts"
            ? results.posts?.length > 0 && renderSection("posts", results.posts)
            : null}
          {category === "all" || category === "groups"
            ? results.groups?.length > 0 &&
              renderSection("groups", results.groups)
            : null}
          {category === "all" || category === "users"
            ? results.users?.length > 0 && renderSection("users", results.users)
            : null}
          {category === "all" || category === "pages"
            ? results.pages?.length > 0 && renderSection("pages", results.pages)
            : null}
          {category === "all" || category === "blogs"
            ? results.blogs?.length > 0 && renderSection("blogs", results.blogs)
            : null}
        </>
      )}
    </div>
  );
}
