import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { appLogo, userProfile } from "@/shared/helpers/helper";
import { useSelector } from "react-redux";
import useReltedUsers from '@/shared/hooks/useReltedUsers';


function FriendsSidebar() {
    // All friendsList from Redux
    useReltedUsers();
    const friendsList = useSelector(state => state.relatedUsers.list);
    const loading = useSelector(state => state.relatedUsers.friendsLoading);
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [search, setSearch] = useState('');
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


    return (
        <div className={`lg:w-65 w-full flex flex-col px-2 border-r border-gray-300 bg-[#ffffff] fixed left-0 h-full`}>
            <div className="p-1 border-b border-gray-200">
                <Link to="/feed" className="flex justify-center py-6">
                    <img src="/logo.png" className="h-20" />
                </Link>
                <h1 className="text-3xl font-bold">Messages</h1>
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search friends..."
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
                        Messaging
                    </NavLink>

                    <NavLink
                        to="/group/chat"
                        className={({ isActive }) =>
                            `px-2 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'
                            }`
                        }
                    >
                        Groups
                    </NavLink>
                </nav>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                    {/* Show 6 skeleton loaders while loading */}
                    {loading && (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <div key={`skeleton-${index}`} className="flex items-center border-b border-gray-100 px-2 py-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 animate-pulse"></div>
                                    <div className="ml-3 flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show empty state when not loading and no friends */}
                    {!loading && filteredFriends.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            {search ? "No friend found" : "No friends available"}
                        </div>
                    )}

                    {/* Show friends list when data is loaded */}
                    {!loading && filteredFriends.map((chat, index) => (
                        <NavLink
                            key={index}
                            to={`/chat/${chat.id}`}
                            className={({ isActive }) => isActive ? 'active-chat' : ''}
                        >
                            {({ isActive }) => (
                                <div className={`flex items-center border-b border-gray-100 px-2 py-3 ${isActive ? 'bg-gray-200 shadow-md rounded' : 'hover:bg-[#e8e9f2]'} cursor-pointer`}>
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                                        <img
                                            src={userProfile(chat.image_profile_url)}
                                            alt="user img"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <h3 className="text-sm font-semibold text-gray-900">{chat.name}</h3>
                                    </div>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FriendsSidebar;