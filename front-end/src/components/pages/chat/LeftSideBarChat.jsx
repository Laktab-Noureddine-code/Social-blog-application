import { MoveLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { groups } from "../../../data/group";
import { useSelector } from "react-redux";
import useUsersLoader from "../../../hooks/useUsersLoader";

function LeftSideBarChat({ isGroup, friendsList }) {

  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [search, setSearch] = useState('');
  // Initialize friends when friendsList changes
  useEffect(() => {
    if (friendsList && friendsList.length > 0) {
      setFriends(friendsList);
      setFilteredFriends(friendsList);
    }
  }, [friendsList]);

  // Filter friends when search changes
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredFriends(friends);
    } else {
      const result = friends.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFriends(result);
    }
  }, [search, friends]);


  return (
    <div className={`lg:w-80 w-full flex flex-col px-2 border-r border-gray-300 bg-[#f7f7f9] fixed left-0 h-full`}>
      <div className="p-4 border-b border-gray-200">
        <Link to="/accueil">
          <h1 className="text-2xl mb-3 font-bold text-blue-800 flex items-center gap-1">
            <MoveLeft />
            Connected
          </h1>
        </Link>
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 rounded-sm bg-white border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <nav className="flex items-center px-3 gap-5 mt-2">
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'
              }`
            }
          >
            Messagerie
          </NavLink>

          <NavLink
            to="/group/chat"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'
              }`
            }
          >
            Communautés
          </NavLink>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {!isGroup &&
            filteredFriends.map((chat) => (
              <Link key={chat.id} to={`/chat/${chat.id}`}>
                <div className="flex items-center border-b border-gray-100 px-4 py-3 hover:bg-[#e8e9f2] cursor-pointer">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                    <img src={chat.profilePicture} alt="user img" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{chat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}

          {isGroup &&
            groups.map((group, index) => (
              <Link key={index} to={`/group/chat/${group.id}`}>
                <div className="flex items-center border-b border-gray-100 px-4 py-3 hover:bg-[#e8e9f2] cursor-pointer">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white">
                      <img src={group.groupImage} alt={group.groupName} className="w-full h-full object-cover" />
                    </div>
                    {group.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{group.groupName}</h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSideBarChat;
