import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";

export default function ExpandableSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [proposition, setProposition] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const state = useSelector((state) => state);

  // Sample data for demonstration
  const recentSearches = [
    {
      id: 1,
      name: "Garden BBQ",
      type: "Event",
      image: "/images/img1.jpg",
    },
    {
      id: 2,
      name: "Meggie Luck",
      type: "Mutual friends: 20",
      image: "/images/img2.jpg",
    },
    {
      id: 3,
      name: "Burger Place No. 10",
      type: "Restaurant",
      image: "/images/img3.jpg",
    },
  ];

  const people = [
    {
      id: 4,
      name: "Mark Larsen",
      type: "Friend",
      image: "/images/img4.jpg",
    },
  ];

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle input change
  const handleChange = async (e) => {
    setSearchQuery(e.target.value);
    const response = await fetch("/api/searsh/propsitions", {
      method: "POST",
      body: JSON.stringify({ content: e.target.value }),
      headers: {
        Autorization:`Bearer ${state.acces_token}`
      }
    });
    const res = await response.json();
    setProposition(res)
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current.focus();
  };

  // Get filtered results based on active tab and search query
  const getFilteredResults = () => {
    if (searchQuery.trim() !== "") {
      // If there's a search query, show filtered results based on the active tab
      switch (activeTab) {
        case "people":
          return {
            people: people.filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          };
        case "all":
        default:
          return {
            people: people.filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
            recent: [], // Don't show recent searches when actively searching
          };
      }
    } else {
      // If no search query, show recent searches and people based on the active tab
      switch (activeTab) {
        case "people":
          return { people };
        case "all":
        default:
          return { people, recent: recentSearches };
      }
    }
  };

  const results = getFilteredResults();

  return (
    <div className="relative w-full max-w-xl mx-auto max-sm:mt-2" ref={searchRef}>
      {/* Search input */}
      <div
        className={`
          bg-gray-100 rounded-2xl transition-all duration-300 ease-in-out
          ${isFocused ? "rounded-b-none shadow-lg" : ""}
        `}
      >
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type in search"
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className="block w-full pl-10 pr-10 py-3 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
            // className="block w-full pl-10 pr-10 py-3 text-lg border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 p-1 rounded-full hover:bg-gray-200"
            >
              <X size={18} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded search results */}
      {isFocused && (
        <div className="absolute left-0 right-0 bg-white rounded-b-lg shadow-lg border-t border-gray-200 overflow-hidden z-50">
          {/* Filter tabs */}
          <div
            className="flex p-2 gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap"
            style={{ scrollbarWidth: "none" }}
          >
            {["all", "people", "messages", "events"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-full transition ${
                  activeTab === tab
                    ? "bg-gray-200 font-medium"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Results */}
          <div>
            {/* People results */}
            {results.people && results.people.length > 0 && (
              <div>
                {results.people.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <img
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-gray-500">
                          {person.type}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}

            {/* Recent searches */}
            {results.recent && results.recent.length > 0 && (
              <div>
                <div className="px-4 py-2 font-medium">Recent searches</div>
                {results.recent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.type}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {(!results.people || results.people.length === 0) &&
              (!results.recent || results.recent.length === 0) && (
                <div className="px-4 py-8 text-center text-gray-500">
                  No results found
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
