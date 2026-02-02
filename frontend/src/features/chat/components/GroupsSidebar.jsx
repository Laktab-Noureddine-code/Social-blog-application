import { MoveLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { appLogo, groupCover, groupProfile } from "@/shared/helpers/helper";
import { useSelector } from "react-redux";
import useUserGroups from '@/shared/hooks/useUserGroups';

function GroupsSidebar() {
    useUserGroups();
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [search, setSearch] = useState('');
    const location = useLocation();
    const loadingUserGroups = useSelector(state => state.groups.loadingUserGroups);
    const userGroupes = useSelector(state => state.groups.userGroups);

    useEffect(() => {
        if (userGroupes && userGroupes.length > 0) {
            setGroups(userGroupes);
            setFilteredGroups(userGroupes);
        }
    }, [userGroupes]);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredGroups(groups);
        } else {
            const result = groups.filter(e =>
                e.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredGroups(result);
        }
    }, [search, groups]);

    return (
        <div className={`lg:w-65 w-full flex flex-col px-2 border-r border-gray-300 bg-[#ffffff] fixed left-0 h-full`}>
            <div className="p-4 border-b border-gray-200">
                <Link to="/feed" className="flex justify-center py-6">
                    <img src="/logo.png" className="h-20" />
                </Link>
                <h1 className="text-3xl font-bold">Groups</h1>
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search groups..."
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
                            `px-2 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'}`
                        }
                    >
                        Messaging
                    </NavLink>

                    <NavLink
                        to="/group/chat"
                        className={({ isActive }) =>
                            `px-2 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-black hover:bg-gray-200'}`
                        }
                    >
                        Groups
                    </NavLink>
                </nav>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                    {/* Show skeleton loaders while loading */}
                    {loadingUserGroups && (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <div key={`skeleton-${index}`} className="flex items-center border-b border-gray-100 px-4 py-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 animate-pulse"></div>
                                    <div className="ml-3 flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-1"></div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Show empty state when not loading and no groups */}
                    {!loadingUserGroups && filteredGroups.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            {search ? "No group found" : "No groups available"}
                        </div>
                    )}

                    {/* Show groups list when data is loaded */}
                    {!loadingUserGroups && filteredGroups.map((group) => {
                        const isActive = location.pathname === `/group/chat/${group.id}`;
                        return (
                            <Link key={group.id} to={`/group/chat/${group.id}`}>
                                <div className={`flex items-center border-b border-gray-100 px-4 py-3 cursor-pointer ${isActive ? 'bg-gray-200 shadow-md rounded' : 'hover:bg-[#e8e9f2]'}`}>
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white outline flex items-center justify-center text-white">
                                            <img
                                                src={groupCover(group.cover_image)}
                                                alt={group.name}
                                                className="w-full h-full object-cover"
                                            />
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default GroupsSidebar;