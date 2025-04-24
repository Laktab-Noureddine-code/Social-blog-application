import {Search} from "lucide-react";
import LeftSideBarChat from "../../components/pages/chat/LeftSideBarChat";
import RightSideBarChat from "../../components/pages/chat/RightSideBarChat";
import Messages from "../../components/pages/chat/Messages";

function Chat() {
  return (
      <div className="flex h-screen overflow-hidden bg-white ">
          {/* Left Sidebar */}
          <div className="w-80 flex flex-col px-2 border-r border-gray-200 bg-white fixed left-0 h-full">

              <div className="p-4 border-b border-gray-200">
                  <h1 className="text-3xl font-bold">Chats</h1>
                  <div className="mt-4 relative">
                      <input
                          type="text"
                          placeholder="Search in chats"
                          className="w-full pl-10 pr-4 py-2  rounded-full bg-gray-100"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                  <LeftSideBarChat />
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
  )
}

export default Chat
