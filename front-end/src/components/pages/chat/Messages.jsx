import { useEffect, useRef, useState } from "react";

// react router dom library
import {  useNavigate } from "react-router-dom";

// components
import { Send } from "lucide-react";
import { ChevronLeft } from 'lucide-react';

// fake data
import { chats } from "../../../data/chat";


const Messages = () => {
    const [allMessages, setAllMessages] = useState(chats)  
    const messageContainer = useRef(null)
    // const  [displayCount ,setDisplayCount] = useState(20)


    useEffect(() => {
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [allMessages]);

    const navigate = useNavigate()  
    return (
        <div className="flex-1 lg:ml-80 w-full bg-gray-200">
            <div className="h-screen flex flex-col ">
                <div className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <button onClick={()=>navigate('/chat')} className="cursor-pointer mr-2 flex items-center justify-center p-2 hover:bg-gray-100 rounded-full">
                            <ChevronLeft className="text-blue-600 text-3xl"/>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            AT
                        </div>
                        <div className="ml-3">
                            <h2 className="font-semibold">Ava Thompson</h2>
                            <p className="text-sm text-gray-500">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-[#fefffe]" ref={messageContainer}>
                    {allMessages.map((message, index) => (
                        <div
                            key={index}
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
                                    ? "bg-[#6c74c5] text-white shadow-xl rounded-[8px_0px_8px_8px]"
                                    : "bg-gray-50 border border-gray-200 shadow-lg relative rounded-[0_8px_8px_8px]"
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

                <div className="border-t border-gray-400 p-4 bg-white">
                    <div className="flex items-center bg-gray-100 rounded-xl py-1 px-3">
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
        </div>
    );
};

export default Messages;