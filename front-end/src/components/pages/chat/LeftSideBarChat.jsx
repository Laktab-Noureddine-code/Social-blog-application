import { MoveLeft, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function LeftSideBarChat() {
    const {chatId} = useParams()
    const chats = [
        {
            id: 1,
            name: "Ava Thompson",
            lastMessage: "I'm on my way!",
            time: "12m",
            avatar: "AT",
            online: true,
        },
        {
            id: 2,
            name: "Ethan Reynolds",
            lastMessage: "Oh boy! You're in trouble...",
            time: "45m",
            avatar: "ER",
            online: true,
        },
        {
            id: 3,
            name: "Ethan Reynolds",
            lastMessage: "Oh boy! You're in trouble...",
            time: "45m",
            avatar: "ER",
            online: true,
        },
    ];
    return (
        <div className={`lg:w-80 w-full flex flex-col px-2 border-r border-gray-300 bg-[#f7f7f9] fixed left-0 h-full`} >
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl mb-3 font-bold text-blue-800 flex items-center gap-1"><MoveLeft />Connected</h1>
                <h1 className="text-3xl font-bold">Messages</h1>
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full pl-10 pr-4 py-2 rounded-sm bg-white border"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                    {chats.map((chat) => (
                        <div key={chat.id}>
                            <Link to={`/chat/${chat.id}`} >
                                <div 
                                    className="flex items-center border-b border-gray-100 px-4 py-3 hover:bg-[#e8e9f2] cursor-pointer"
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                            {chat.avatar}
                                        </div>
                                        {chat.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900">{chat.name}</h3>
                                            <span className="text-xs text-gray-500">{chat.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftSideBarChat
