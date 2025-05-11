import { useSelector } from "react-redux";
import LeftSideBarChat from "../../components/pages/chat/LeftSideBarChat";
import { Outlet, useLocation } from "react-router-dom";
import useMessagesLoader from "../../hooks/useMessagesLoader";
import useUsersLoader from "../../hooks/useUsersLoader";
import useUserGroups from "../../hooks/useUserGroups";
import useGroupMessages from "../../hooks/useGroupMessages";

function Chat({ isGroup }) {
    useUsersLoader();
    useMessagesLoader();
    useUserGroups();
    useGroupMessages();
    const location = useLocation().pathname;
    const isRootPath = ["/chat", "/chat/", "/group/chat", "/group/chat/"].includes(location);
    const user = useSelector(state => state.auth.user);

    // simple messages
    // All friendsList from Redux
    const friendsList = useSelector(state => state.users.users);
    // All messages from Redux
    const messagesList = useSelector(state => state.messages.messages);

    // groupe messages
    // All user groups from redux
    const userGroupes = useSelector(state => state.groups.userGroups);
    // All groupe messages from Redux
    const groupMessages = useSelector(state => state.groups.messages)


    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-xl font-medium">Chargement...</h1>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Left Sidebar - Always visible on large screens, conditionally on small screens */}
            <div className={`
                ${isRootPath ? 'flex' : 'hidden lg:flex'}
                border-r border-gray-200 bg-[#f7f7f9] 
                lg:fixed lg:left-0 lg:h-full lg:w-80    
                w-full
            `}>
                <LeftSideBarChat isGroup={isGroup} friendsList={friendsList} userGroupes={userGroupes} />
            </div>

            {/* Main Chat Area - Only shows "no conversation" message on large screens at root path */}
            {isRootPath && (
                <div className="flex-1 relative lg:ml-80 bg-gray-200 hidden lg:block">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <h2 className="text-xl font-medium text-gray-800">Aucune conversation sélectionnée</h2>
                        <p className="mt-2 text-gray-700">
                            Sélectionnez {isGroup ? "un groupe" : "un ami"} pour commencer à discuter
                        </p>
                    </div>
                </div>
            )}

            {/* Outlet - Will show messages when a chat is selected */}
            <Outlet context={{ isGroup, messagesList, user }} />
        </div>
    )
}

export default Chat;