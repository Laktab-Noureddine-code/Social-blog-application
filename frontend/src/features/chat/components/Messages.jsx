import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ChevronLeft, Info } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import api from "@/lib/api";
import MessageField from "./MessageField";
import MessageFieldGroup from "./MessageFieldGroup";
import Message from "./Message";
import { groupCover, userProfile } from "@/shared/helpers/helper";
import { AddGroupMessages, addMessage, deleteMessage, setEditingMessage, updateMessage, updateGroupMessage, deleteGroupMessage } from "@/Redux/messagesSlice";
import Pusher from "pusher-js";
import { REVERB_CONFIG } from "@/config/pusher";
import useMessagesLoader from '@/shared/hooks/useMessagesLoader';
import SkeletonMessages from "@/shared/components/skeletons/SkeletonMessages";
import useGroupMessages from '@/shared/hooks/useGroupMessages';

const MESSAGES_PER_LOAD = 10;

// Helper to format date headers (ex: "sam 17 mai")
const formatDateHeader = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'long'
    }).replace('.', '');
};

// Helper to format time under message (ex: "14:07")
const formatTimeOnly = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const Messages = () => {
    const { isGroup, user, setShowRSB } = useOutletContext();
    const { chatId } = useParams();
    useMessagesLoader(chatId, isGroup);
    useGroupMessages(chatId, isGroup);
    const navigate = useNavigate();
    const messageContainer = useRef(null);
    const dispatch = useDispatch();

    const allMessages = useSelector(state => state.messages.messages);
    const allGroupMessages = useSelector(state => state.messages.groupMessages);
    const friend = useSelector(state => state.relatedUsers.list.find(fr => fr.id === +chatId));
    const groups = useSelector(state => state.groups.userGroups);
    const messagesLoading = useSelector(state => state.messages.messagesLoading);

    const chatInfo = isGroup
        ? groups.find(group => group.id === +chatId)
        : friend;

    // Filter messages based on conversation type
    const filteredMessages = useMemo(() => {
        if (isGroup) {
            return allGroupMessages.filter(m => m.group_id === +chatId);
        }
        return allMessages.filter(m =>
            (m.sender_id === +chatId && m.receiver_id === user.id) ||
            (m.receiver_id === +chatId && m.sender_id === user.id)
        );
    }, [allMessages, allGroupMessages, chatId, isGroup, user.id]);

    // Sort messages by date
    const sortedMessages = useMemo(() => {
        return [...filteredMessages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }, [filteredMessages]);

    const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_LOAD);
    const visibleMessages = useMemo(() => sortedMessages.slice(-visibleCount), [sortedMessages, visibleCount]);

    // Group messages by date (only one header per day)
    const groupedMessages = useMemo(() => {
        const groups = [];
        let currentDate = '';
        let currentGroup = [];

        visibleMessages.forEach((msg) => {
            const messageDate = formatDateHeader(msg.created_at);

            if (messageDate !== currentDate) {
                if (currentGroup.length > 0) {
                    groups.push({
                        date: currentDate,
                        messages: [...currentGroup]
                    });
                }
                currentGroup = [msg];
                currentDate = messageDate;
            } else {
                currentGroup.push(msg);
            }
        });

        // Add the last group
        if (currentGroup.length > 0) {
            groups.push({
                date: currentDate,
                messages: [...currentGroup]
            });
        }

        return groups;
    }, [visibleMessages]);

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + MESSAGES_PER_LOAD, filteredMessages.length));
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [sortedMessages.length]);

    // Pusher subscription for new messages (pointing to Reverb)
    useEffect(() => {
        if (!chatId || !user?.id) return;

        const pusher = new Pusher(REVERB_CONFIG.key, {
            wsHost: REVERB_CONFIG.wsHost,
            wsPort: REVERB_CONFIG.wsPort,
            wssPort: REVERB_CONFIG.wssPort,
            forceTLS: REVERB_CONFIG.forceTLS,
            enabledTransports: REVERB_CONFIG.enabledTransports,
            disableStats: REVERB_CONFIG.disableStats,
            cluster: REVERB_CONFIG.cluster,
        });
        let channel;

        if (isGroup) {
            channel = pusher.subscribe(`group.${chatId}`);
            channel.bind('group-message', (data) => {
                if (!data.created_at) {
                    data.created_at = new Date().toISOString();
                }
                dispatch(AddGroupMessages(data));
            });

            // Listen for group message updates
            channel.bind('group-message-updated', (data) => {
                dispatch(updateGroupMessage({
                    id: data.id,
                    message: data.message,
                    is_edited: data.is_edited
                }));
            });
        } else {
            channel = pusher.subscribe('chat');
            channel.bind('message', (data) => {
                if (
                    (data.sender_id === +chatId && data.receiver_id === user.id) ||
                    (data.receiver_id === +chatId && data.sender_id === user.id)
                ) {
                    if (!data.created_at) {
                        data.created_at = new Date().toISOString();
                    }
                    dispatch(addMessage(data));
                }
            });

            // Listen for message updates
            channel.bind('message-updated', (data) => {
                if (
                    (data.sender_id === +chatId && data.receiver_id === user.id) ||
                    (data.receiver_id === +chatId && data.sender_id === user.id)
                ) {
                    dispatch(updateMessage({
                        id: data.id,
                        message: data.message,
                        is_edited: data.is_edited
                    }));
                }
            });
        }

        return () => {
            if (channel) {
                channel.unbind_all();
                channel.unsubscribe();
            }
            pusher.disconnect();
        };
    }, [dispatch, chatId, user.id, isGroup]);

    const handleDeleteMessage = async (messageId) => {
        try {
            const endpoint = isGroup 
                ? `/api/group/messages/${messageId}` 
                : `/api/messages/${messageId}`;
            
            await api.delete(endpoint);

            if (isGroup) {
                dispatch(deleteGroupMessage(messageId));
            } else {
                dispatch(deleteMessage(messageId));
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEditMessage = (message) => {
        dispatch(setEditingMessage(message));
    };
    

    return (
        <div className="flex-1 lg:ml-65 lg:mr-65 w-full bg-gray-200 h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white shadow-xl p-4 flex items-center">
                <button onClick={() => navigate(isGroup ? '/group/chat' : '/chat')} className="mr-2 p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="text-blue-600 text-3xl" />
                </button>
                {chatInfo && (
                    <Link to={isGroup ? `/groups/${chatInfo.id}` : `/profile/${chatInfo.id}`}>
                        <div className="flex items-center">
                            <img
                                src={isGroup ? groupCover(chatInfo.cover_image) : userProfile(chatInfo.profile_image)}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover mr-2"
                            />
                            <h2 className="font-semibold text-lg">{chatInfo.name}</h2>
                        </div>
                    </Link>
                )}
                <button
                    onClick={() => setShowRSB(true)}
                    className="p-2 rounded-full hover:bg-gray-100 block lg:hidden"
                >
                    <Info className="text-blue-600 text-2xl" />
                </button>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100" ref={messageContainer}>
                {visibleCount < filteredMessages.length && (
                    <div className="flex justify-center mb-4">
                        <button onClick={loadMore} className="px-4 py-2 bg-gray-100 border rounded-full text-sm hover:bg-gray-200">
                            Load More
                        </button>
                    </div>
                )}

                {/* Messages list */}
                {!messagesLoading && visibleMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full pb-20">
                        <div className="text-center p-6 max-w-md">
                            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {isGroup ? "No messages in this group" : "No messages with this friend"}
                            </h3>
                            <p className="text-gray-500">
                                {isGroup
                                    ? "Send the first message to start the conversation in this group."
                                    : "Send a message to start the conversation with " + chatInfo?.name
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Only show skeleton on initial load when no messages exist yet */}
                        {messagesLoading && visibleMessages.length === 0 ? (
                            <SkeletonMessages />
                        ) : (
                            groupedMessages.map((group, groupIndex) => (
                                <div key={groupIndex} className="mb-4">
                                    <div className="flex justify-center mb-2">
                                        <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full shadow">
                                            {group.date}
                                        </span>
                                    </div>
                                    {group.messages.map((msg, index) => (
                                        <Message
                                            key={index}
                                            message={msg}
                                            isMyMessage={msg.sender_id === user.id}
                                            onDelete={handleDeleteMessage}
                                            onEdit={handleEditMessage}
                                            time={formatTimeOnly(msg.created_at)}
                                        />
                                    ))}
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>

            {/* Input field */}
            {isGroup ? (
                <MessageFieldGroup group={chatInfo} user={user} />
            ) : (
                <MessageField receiverId={chatId} user={user} />
            )}
        </div>
    );
};

export default Messages;