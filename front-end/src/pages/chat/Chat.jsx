import LeftSideBarChat from "../../components/pages/chat/LeftSideBarChat";
import RightSideBarChat from "../../components/pages/chat/RightSideBarChat";
import Messages from "../../components/pages/chat/Messages";
import { Outlet, useLocation } from "react-router-dom";
function Chat() {
    const location = useLocation().pathname
    return (
        <div className="flex h-screen overflow-hidden bg-white ">
            {/* Left Sidebar */}
            <div className={`${location == "/chat" || location == "/chat/" ? "" : "lg:block hidden"} flex border-r  border-gray-200 bg-[#f7f7f9] fixed left-0 h-full`}>
                <LeftSideBarChat />
            </div>
            {/* Main Chat Area */}
            {(location === "/chat" || location === "/chat/" )&& <div className="flex-1 relative lg:ml-80 w-full bg-gray-200">
                <div className="absolute top-[50%] left-[50%] lg:block hidden translate-[-50%] text-center">
                    <h2 className="text-xl font-medium text-gray-800">Aucune conversation sélectionnée</h2>
                    <p className="mt-2 text-gray-700">Sélectionnez un ami pour commencer à discuter</p>
                </div>
            </div>}
            <Outlet />
            {/* Right Sidebar */}
            {/*  <div className="w-80 border-l border-gray-200 bg-white fixed right-0 h-full overflow-y-auto">
              <RightSideBarChat />
          </div> */}
        </div>
    )
}

export default Chat
