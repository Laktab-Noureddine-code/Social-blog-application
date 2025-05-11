import { MoveLeft, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { groupProfile, userProfile } from "../../../helpers/helper";

function LeftSideBarChat({ isGroup, friendsList, userGroupes }) {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (friendsList && friendsList.length > 0) {
      setFriends(friendsList);
      setFilteredFriends(friendsList);
    }
  }, [friendsList]);

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

  // Check if current route is a specific chat or group chat
  const isSpecificChat = location.pathname.startsWith('/chat/') && !location.pathname.startsWith('/chat/group');
  const isSpecificGroupChat = location.pathname.startsWith('/group/chat/');

  // Filter out the current chat/group from the list
  const filteredList = useMemo(() => {
    if (isSpecificChat) {
      const chatId = location.pathname.split('/chat/')[1];
      return filteredFriends.filter(friend => friend.id !== parseInt(chatId));
    } else if (isSpecificGroupChat) {
      const groupId = location.pathname.split('/group/chat/')[1];
      return userGroupes.filter(group => group.id !== parseInt(groupId));
    }
    return isGroup ? userGroupes : filteredFriends;
  }, [location.pathname, filteredFriends, userGroupes, isGroup, isSpecificChat, isSpecificGroupChat]);

  return (
    <div className={`lg:w-70 w-full flex flex-col px-2 border-r border-gray-300 bg-[#ffffff] fixed left-0 h-full`}>
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
            className="w-full pl-10 pr-4 py-2 rounded-sm bg-gray-100 border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <nav className="flex items-center px-1 gap-2 mt-2">
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `px-2 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'
              }`
            }
          >
            Messagerie
          </NavLink>

          <NavLink
            to="/group/chat"
            className={({ isActive }) =>
              `px-2 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'
              }`
            }
          >
            Communautés
          </NavLink>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {!isGroup && filteredList.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              {search ? "Aucun ami trouvé" : "Aucun ami disponible"}
            </div>
          )}

          {isGroup && filteredList.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              {search ? "Aucun groupe trouvé" : "Aucun groupe disponible"}
            </div>
          )}

          {!isGroup &&
            filteredList.map((chat) => (
              <Link key={chat.id} to={`/chat/${chat.id}`}>
                <div className="flex items-center border-b border-gray-100 px-4 py-3 hover:bg-[#e8e9f2] cursor-pointer">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                    <img src={userProfile(chat.profilePicture)} alt="user img" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{chat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}

          {isGroup &&
            filteredList.map((group, index) => (
              <Link key={index} to={`/group/chat/${group.id}`}>
                <div className="flex items-center border-b border-gray-100 px-4 py-3 hover:bg-[#e8e9f2] cursor-pointer">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white outline flex items-center justify-center text-white">
                      <img src={groupProfile(group.profile_image)} alt={group.name} className="w-full h-full object-cover" />
                    </div>
                    {group.visibility === 'public' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{group.name}</h3>
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