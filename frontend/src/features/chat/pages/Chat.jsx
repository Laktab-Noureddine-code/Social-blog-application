/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import FriendsSidebar from "../components/FriendsSidebar";
import GroupsSidebar from "../components/GroupsSidebar";
import RightSideBar from "../components/RightSideBar";
import { useState } from "react";
import RightSideBarGroup from "../components/RightSideBarGroup";

function Chat({ isGroup }) {
    const [showRSB, setShowRSB] = useState(false);
    const location = useLocation().pathname;
    const isRootPath = ["/chat", "/chat/", "/group/chat", "/group/chat/"].includes(location);
    const user = useSelector(state => state.auth.user);


    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-xl font-medium">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Left Sidebar */}
            <div className={`
                ${isRootPath ? 'flex' : 'hidden lg:flex'}
                border-r border-gray-200 bg-[#f7f7f9] 
                lg:fixed lg:left-0 lg:h-full lg:w-65
                w-full
            `}>
                {isGroup ? (
                    <GroupsSidebar />
                ) : (
                    <FriendsSidebar />
                )}
            </div>

            {/* Main Chat Area */}
            {isRootPath && (
                <div className="flex-1 relative lg:ml-65 bg-gray-200 hidden lg:block">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <h2 className="text-xl font-medium text-gray-800">No conversation selected</h2>
                        <p className="mt-2 text-gray-700">
                            Select {isGroup ? "a group" : "a friend"} to start chatting
                        </p>
                    </div>
                </div>
            )}

            {/* Outlet - Will show messages when a chat is selected */}
            <Outlet context={{
                isGroup,
                showRSB,
                setShowRSB,
                user
            }} />

            {/* {!isRootPath &&
                <RightSideBar showRSB={showRSB} />
            } */}
            {isGroup ?
                <RightSideBarGroup
                    isRootPath={isRootPath}
                    showRSB={showRSB}
                    setShowRSB={setShowRSB}
                    isGroup={isGroup} /> :
                <RightSideBar
                    // user={user}
                    isRootPath={isRootPath}
                    showRSB={showRSB}
                    setShowRSB={setShowRSB}
                    isGroup={isGroup}
                />
            }
        </div>
    )
}

export default Chat;