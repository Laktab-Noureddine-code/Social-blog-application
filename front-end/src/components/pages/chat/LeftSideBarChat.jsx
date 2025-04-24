function LeftSideBarChat() {
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
    ];
    return (
        <div className="py-2">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    className="flex items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50 cursor-pointer"
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
            ))}
        </div>
    )
}

export default LeftSideBarChat
