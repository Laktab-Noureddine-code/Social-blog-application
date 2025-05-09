import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { formatDateHeader, useCover } from "../../../helpers/helper";
import { groups } from "../../../data/group";
import { useSelector, useDispatch } from "react-redux";
import MessageField from "./MessageField";
import Pusher from "pusher-js";
import { addMessage, deleteMessage } from "../../../Redux/messagesSlice";
import Message from "./Message";

const MESSAGES_PER_LOAD = 10;

const Messages = () => {
    const { isGroup, user } = useOutletContext();
    const { chatId } = useParams();
    const navigate = useNavigate();
    const messageContainer = useRef(null);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    // Sélectionner TOUS les messages du store
    const allMessages = useSelector(state => state.messages.messages);

    // Filtrer les messages liés à ce chatId
    const filteredMessages = allMessages.filter(m =>
        (m.sender_id === +chatId && m.receiver_id === user.id) ||
        (m.receiver_id === +chatId && m.sender_id === user.id)
    );

    // Gérer combien de messages on montre
    const [visibleMessagesCount, setVisibleMessagesCount] = useState(MESSAGES_PER_LOAD);
    const visibleMessages = filteredMessages.slice(-visibleMessagesCount);

    // Récup info du chat (user ou group)
    const chatData = useSelector(state => state.users.users);
    const chatInfo = isGroup
        ? groups.find(group => group.id === +chatId)
        : chatData.find(friend => friend.id === +chatId);

    const extractDay = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split("T")[0];
    };

    const isMyMessage = (message) => message.sender_id === user.id;

    // Auto scroll vers le bas au premier rendu
    useEffect(() => {
        if (messageContainer.current && visibleMessagesCount === MESSAGES_PER_LOAD) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [visibleMessagesCount, filteredMessages]);

    // Load more messages
    const loadMore = () => {
        if (!messageContainer.current) return;

        const container = messageContainer.current;
        const previousScrollHeight = container.scrollHeight;
        const previousScrollTop = container.scrollTop;

        setVisibleMessagesCount(prev => {
            const newCount = Math.min(prev + MESSAGES_PER_LOAD, filteredMessages.length);

            setTimeout(() => {
                const newScrollHeight = container.scrollHeight;
                container.scrollTop = newScrollHeight - previousScrollHeight + previousScrollTop;
            }, 0);

            return newCount;
        });
    };

    // Pusher pour recevoir les nouveaux messages en temps réel
    useEffect(() => {
        if (!token || !chatId) return;

        const pusher = new Pusher('bbd7507f62ff970a1689', {
            cluster: 'eu',
            authEndpoint: '/broadcasting/auth',
            auth: {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }
        });

        const channelName = `private-chat.${[user.id, chatId].sort().join('.')}`;
        const channel = pusher.subscribe(channelName);

        channel.bind('message', (newMessage) => {
            dispatch(addMessage(newMessage));

            // Auto-scroll to new message
            setTimeout(() => {
                if (messageContainer.current) {
                    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
                }
            }, 100);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [dispatch, chatId, user?.id, token]);

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce message ?")) {
            return; // L'utilisateur a annulé
        }

        try {
            const response = await fetch(`/api/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erreur lors de la suppression");
            }

            // Si suppression réussie → on enlève du store Redux
            dispatch(deleteMessage(messageId));

        } catch (err) {
            console.error('Erreur suppression message:', err);
            alert(err.message);
        }
    };

    if (!user) return navigate('/chat');

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
                                <img src={chatInfo.profilePicture ? chatInfo.profilePicture : useCover} alt="profile img" className="w-full h-full" />
                            </div>
                            <div className="ml-3">
                                <h2 className="font-semibold">{chatInfo.name}</h2>
                            </div>
                        </div>
                    )}
                </div>

                {/* Messages container */}
                <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-[#fefffe]" ref={messageContainer}>
                    {/* Load more button */}
                    {visibleMessagesCount < filteredMessages.length && (
                        <div className="flex justify-center mb-4">
                            <button onClick={loadMore} className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm hover:bg-gray-200 transition">
                                Charger plus
                            </button>
                        </div>
                    )}

                    {/* Messages */}
                    {visibleMessages.map((message, index) => {
                        const currentDay = extractDay(message.created_at);
                        const previousDay = index > 0 ? extractDay(visibleMessages[index - 1].created_at) : null;
                        const showDateHeader = currentDay !== previousDay;

                        return (
                            <Message
                                key={index}
                                message={message}
                                showDateHeader={showDateHeader}
                                formatDateHeader={formatDateHeader}
                                isMyMessage={isMyMessage}
                                onDelete={handleDeleteMessage}
                            />
                        );
                    })}
                </div>

                {/* Input */}
                <MessageField user={user} />
            </div>
        </div>
    );
};

export default Messages;