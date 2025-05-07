import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { chats } from "../../../data/chat";
import { formatDateHeader } from "../../../helpers/helper";
import { groups } from "../../../data/group";
import { useSelector } from "react-redux";
import MessageField from "./MessageField";

const MESSAGES_PER_LOAD = 10;

const Messages = () => {
    const { isGroup } = useOutletContext();
    const [allMessages] = useState(chats); // Full array of all messages
    const [visibleMessagesCount, setVisibleMessagesCount] = useState(MESSAGES_PER_LOAD);
    const messageContainer = useRef(null);
    const navigate = useNavigate();
    const { chatId } = useParams()
    const chatData = useSelector(state => state.users.users)

    const chatInfo = isGroup ? groups.find(group => group.id === +chatId) :
        chatData.find(friend => friend.id === +chatId)

    // Slice the messages to show based on visibleMessagesCount
    const visibleMessages = allMessages.slice(-visibleMessagesCount);

    const extractDay = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split("T")[0];
    };

    // Auto scroll to bottom ONLY on initial load
    useEffect(() => {
        if (messageContainer.current && visibleMessagesCount === MESSAGES_PER_LOAD) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [visibleMessagesCount]);

    const loadMore = () => {
        if (!messageContainer.current) return;

        const container = messageContainer.current;
        const previousScrollHeight = container.scrollHeight;
        const previousScrollTop = container.scrollTop;
        setVisibleMessagesCount(prev => {
            const newCount = Math.min(prev + MESSAGES_PER_LOAD, allMessages.length);

            // After state update, adjust scroll position
            setTimeout(() => {
                const newScrollHeight = container.scrollHeight;
                container.scrollTop = newScrollHeight - previousScrollHeight + previousScrollTop;
            }, 0);

            return newCount;
        });
    };

    return (
        <div className="flex-1 lg:ml-80 w-full bg-gray-200">
            <div className="h-screen flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
                    {isGroup ? (
                        <div className="flex items-center">
                            <button onClick={() => navigate('/group/chat')} className="cursor-pointer mr-2 flex items-center justify-center p-2 hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="text-blue-600 text-3xl" />
                            </button>
                            <div>Group</div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <button onClick={() => navigate('/chat')} className="cursor-pointer mr-2 flex items-center justify-center p-2 hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="text-blue-600 text-3xl" />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex overflow-hidden items-center justify-center text-white">
                                <img src={chatInfo.profilePicture} alt="profile img" className="w-full h-full"/>
                            </div>
                            <div className="ml-3">
                                <h2 className="font-semibold">{chatInfo.name}</h2>
                            </div>
                        </div>
                    )}
                </div>

                {/* Messages container */}
                <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-[#fefffe]" ref={messageContainer}>

                    {/* Load more button if needed */}
                    {visibleMessagesCount < allMessages.length && (
                        <div className="flex justify-center mb-4">
                            <button onClick={loadMore} className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm hover:bg-gray-200 transition">
                                Charger plus
                            </button>
                        </div>
                    )}

                    {/* Render messages */}
                    {visibleMessages.map((message, index) => {
                        const currentDay = extractDay(message.timestamp);
                        const previousDay = index > 0 ? extractDay(visibleMessages[index - 1].timestamp) : null;
                        const showDateHeader = currentDay !== previousDay;

                        return (
                            <div key={index}>
                                {showDateHeader && (
                                    <div className="text-gray-600 text-sm my-2 text-center">
                                        {formatDateHeader(message.timestamp)}
                                    </div>
                                )}
                                <div className={`flex mb-4 ${message.sender_id === 1 ? "justify-end" : "justify-start"}`}>
                                    <div title={formatDateHeader(message.timestamp)} className={`px-4 py-2 max-w-md ${message.sender_id === 1 ? "bg-[#6c74c5] text-white shadow-xl rounded-[8px_0px_8px_8px]" : "bg-gray-50 border border-gray-200 shadow-lg relative rounded-[0_8px_8px_8px]"}`}>
                                        {message.text && <p className="text-sm">{message.text}</p>}
                                        {message.media && (
                                            <img src={message.media.url} alt={message.media.name} crossOrigin="anonymous" loading="lazy" className="max-w-full h-auto rounded-md" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input */}
               <MessageField/>

            </div>
        </div>
    );
};

export default Messages;
