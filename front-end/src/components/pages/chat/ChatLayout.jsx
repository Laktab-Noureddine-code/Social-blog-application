import { MessageSquare, Users, Bell, Search, Settings } from "lucide-react";
import LeftSideBarChat from "./LeftSideBarChat";
import Messages from "./Messages";
import RightSideBarChat from "./RightSideBarChat";

const ChatLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Left Sidebar */}
            <div className="w-80 flex flex-col border-r border-gray-200 bg-white fixed left-0 h-full">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold">Chats</h1>
                    <div className="mt-4 relative">
                        <input
                            type="text"
                            placeholder="Search in chats"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <LeftSideBarChat />
                </div>
                <div className="border-t border-gray-200 p-4 flex justify-around">
                    <MessageSquare className="h-6 w-6 text-gray-600 cursor-pointer" />
                    <Users className="h-6 w-6 text-gray-600 cursor-pointer" />
                    <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                    <Settings className="h-6 w-6 text-gray-600 cursor-pointer" />
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 ml-80 mr-80">
                <Messages />
            </div>

            {/* Right Sidebar */}
            <div className="w-80 border-l border-gray-200 bg-white fixed right-0 h-full overflow-y-auto">
                <RightSideBarChat />
            </div>
        </div>
    );
};

export default ChatLayout;