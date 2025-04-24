import { Send } from "lucide-react";

const messages = [
    {
        id: 1,
        content: "I'm on my way but there is crying baby in a bus and I forgot my headphones at home. Un...",
        sender: "me",
        timestamp: "12:30 PM",
    },
    {
        id: 2,
        content: "Hi here. Where are you?",
        sender: "other",
        timestamp: "12:32 PM",
    },
    {
        id: 3,
        content: "You are ridiculous!!!",
        sender: "me",
        timestamp: "12:33 PM",
    },
];

const Messages = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        AT
                    </div>
                    <div className="ml-3">
                        <h2 className="font-semibold">Ava Thompson</h2>
                        <p className="text-sm text-gray-500">Online</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex mb-4 ${message.sender === "me" ? "justify-end" : "justify-start"
                            }`}
                    >
                        {message.sender !== "me" && (
                            <div className="w-8 h-8 mr-3 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                AT
                            </div>
                        )}
                        <div
                            className={` px-4 py-2 max-w-md ${message.sender === "me"
                                ? "bg-blue-600 text-white shadow-xl rounded-xl"
                                : "bg-white shadow-lg relative rounded-[0_8px_8px_8px]"
                                }`}
                        >
                            <p className="text-sm">{message.content}</p>
                            <span
                                className={`text-xs ${message.sender === "me" ? "text-blue-100" : "text-gray-500"
                                    } block mt-1`}
                            >
                                {message.timestamp}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-400 p-4">
                <div className="flex items-center bg-gray-100 rounded-xl p-2">
                    {/* <div className="flex space-x-2 px-2">
                        <Paperclip className="h-6 w-6 text-gray-400 cursor-pointer" />
                        <Image className="h-6 w-6 text-gray-400 cursor-pointer" />
                    </div> */}
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-lg font-[500] px-4 py-2 focus:outline-none"
                    />
                    <Send className="h-6 w-6 text-blue-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Messages;