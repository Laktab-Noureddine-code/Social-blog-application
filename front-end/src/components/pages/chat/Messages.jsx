import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ChevronLeft, Info } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import MessageField from "./MessageField";
import MessageFieldGroup from "./MessageFieldGroup";
import Message from "./Message";
import { groupProfile, userProfile } from "../../../helpers/helper";
import { AddGroupMessages, addMessage, deleteMessage } from "../../../Redux/messagesSlice";
import Pusher from "pusher-js";
import useMessagesLoader from "../../../hooks/useMessagesLoader";
import SkeletonMessages from "../../loader/SkeletonMessages";
import useGroupMessages from "../../../hooks/useGroupMessages";

const MESSAGES_PER_LOAD = 10;

// Helper pour formater la date en haut (ex: Ven 21:40)
const formatTopDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    // Format : Ven 21:40
    return date.toLocaleDateString('fr-FR', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }).replace('.', ''); // retirer point après jour si présent
};


// if (messagesLoading) return <SkeletonMessages />
const Messages = () => {
    const { isGroup, user, setShowRSB } = useOutletContext();
    const isSending = useSelector(state => state.messages.sendingMessage);
    const { chatId } = useParams();
    useMessagesLoader(chatId ,isGroup);
    useGroupMessages(chatId ,isGroup)
    const navigate = useNavigate();
    const messageContainer = useRef(null);
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.access_token);
    const allMessages = useSelector(state => state.messages.messages);
    const allGroupMessages = useSelector(state => state.messages.groupMessages);
    const friend = useSelector(state => state.relatedUsers.list.find(fr => fr.id === +chatId));

    const groups = useSelector(state => state.groups.userGroups);

    const messagesLoading = useSelector(state => state.messages.messagesLoading);
    const chatInfo = isGroup
        ? groups.find(group => group.id === +chatId)
        : friend

    // Filtrer les messages selon le type de conversation
    const filteredMessages = useMemo(() => {
        if (isGroup) {
            return allGroupMessages.filter(m => m.group_id === +chatId);
        }
        return allMessages.filter(m =>
            (m.sender_id === +chatId && m.receiver_id === user.id) ||
            (m.receiver_id === +chatId && m.sender_id === user.id)
        );
    }, [allMessages, allGroupMessages, chatId, isGroup, user.id]);

    // Trier les messages par date
    const sortedMessages = useMemo(() => {
        return [...filteredMessages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }, [filteredMessages]);

    const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_LOAD);
    const visibleMessages = useMemo(() => sortedMessages.slice(-visibleCount), [sortedMessages, visibleCount]);

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + MESSAGES_PER_LOAD, filteredMessages.length));
    };

    // Scroll en bas quand messages changent
    useEffect(() => {
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [sortedMessages.length]);

    // Abonnement Pusher pour les nouveaux messages
    useEffect(() => {
        if (!token || !chatId || !user?.id) return;

        const pusher = new Pusher('bbd7507f62ff970a1689', { cluster: 'eu' });
        let channel;

        if (isGroup) {
            channel = pusher.subscribe(`group.${chatId}`);
            channel.bind('group-message', (data) => {
                if (!data.created_at) {
                    data.created_at = new Date().toISOString();
                }
                dispatch(AddGroupMessages(data));
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
        }

        return () => {
            if (channel) {
                channel.unbind_all();
                channel.unsubscribe();
            }
            pusher.disconnect();
        };
    }, [dispatch, chatId, user.id, token, isGroup]);

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce message ?")) return;

        try {
            const response = await fetch(`/api/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erreur lors de la suppression");
            }

            dispatch(deleteMessage(messageId));
        } catch (err) {
            alert(err.message);
        }
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
                                src={isGroup ? groupProfile(chatInfo.profile_image) : userProfile(chatInfo.profile_image)}
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
                            Charger plus
                        </button>
                    </div>
                )}

                {/* Afficher date en haut de la conversation (si messages présents) */}
                {visibleMessages.length > 0 && (
                    <div className="flex justify-center mb-4">
                        <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full shadow">
                            {formatTopDate(visibleMessages[0].created_at)}
                        </span>
                    </div>
                )}
                {/* Liste des messages */}
                {!messagesLoading && visibleMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full pb-20">
                        <div className="text-center p-6 max-w-md">
                            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {isGroup ? "Aucun message dans ce groupe" : "Aucun message avec cet ami"}
                            </h3>
                            <p className="text-gray-500">
                                {isGroup
                                    ? "Envoyez le premier message pour démarrer la conversation dans ce groupe."
                                    : "Envoyez un message pour démarrer la conversation avec " + chatInfo?.name
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messagesLoading && !isSending
                            ?
                            <SkeletonMessages />
                            :
                            visibleMessages.map((msg, index) => (
                                <Message
                                    key={index}
                                    message={msg}
                                    isMyMessage={msg.sender_id === user.id}
                                    onDelete={handleDeleteMessage}
                                />
                            ))
                        }
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
