/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { Bell, Heart, MessageSquare, Users, UserPlus, X } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import useNotifications from '@/shared/hooks/useNotifications';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, selectUnreadCount, markAsRead, markAllAsRead } from '@/Redux/notificationsSlice';
import { useNavigate } from 'react-router-dom';

function NotificationsModel({ onClose }) {
    useNotifications();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifications = useSelector(selectNotifications);

    const handleNotificationClick = (notification) => {
        // Marquer la notification comme lue
        if (notification.is_read === 0) {
            dispatch(markAsRead(notification.id));
        }
        
        // Rediriger vers le contenu approprié
        if (notification.content) {
            navigate(`/${notification.content}`);
            onClose();
        }
    };

    const handleMarkAllAsRead = () => {
        dispatch(markAllAsRead());
    };

    const getIcon = (type) => {
        switch (type) {
            case 'like': 
            case 'like_post':
            case 'like_blog':
                return <Heart className="w-4 h-4 text-gray-500" />;
            case 'comment': 
            case 'comment_post':
            case 'comment_blog':
                return <MessageSquare className="w-4 h-4 text-gray-500" />;
            case 'group': 
            case 'group_invite':
                return <Users className="w-4 h-4 text-gray-500" />;
            case 'friend': 
            case 'follow_user':
                return <UserPlus className="w-4 h-4 text-gray-500" />;
            case 'follow_page':
                return <Users className="w-4 h-4 text-gray-500" />;
            default: 
                return <Bell className="w-4 h-4 text-gray-500" />;
        }
    };

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) {
            return 'il y a quelques secondes';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `il y a ${days} jour${days > 1 ? 's' : ''}`;
        }
    };

    return (
        <div className="fixed inset-0 z-40 sm:absolute sm:inset-auto">
            {/* Backdrop for mobile */}
            <div
                className="fixed inset-0 bg-black/10 sm:hidden"
                onClick={onClose}
            />  

            <Card className="absolute right-0 mt-2 w-80 max-h-100 overflow-y-auto z-50 shadow-xl rounded-lg">
                <div className="py-1 px-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={18} />
                    </button>
                </div>

                <div className="divide-y">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            Aucune notification
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-2 flex items-start gap-3 hover:bg-gray-50 cursor-pointer ${notification.is_read === 0 ? 'bg-blue-50' : ''}`}
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/images/default-avatar.png" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        {getIcon(notification.type)}
                                        <p className="text-sm font-medium">Notification</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{formatDate(notification.created_at)}</p>
                                </div>

                                {notification.is_read === 0 && (
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="p-3 border-t text-center">
                    <Button 
                        variant="ghost" 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={handleMarkAllAsRead}
                    >
                        Marquer tout comme lu
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default function NotificationBell() {
    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = useSelector(selectUnreadCount);
    const buttonRef = useRef(null);

    const handleClickOutside = (e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target)) {
            setShowNotifications(false);
        }
    };

    useEffect(() => {
        if (showNotifications) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showNotifications]);

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    return (
        <div className="relative" ref={buttonRef}>
            <button
                className={`
          p-2 mx-1 relative rounded-full transition-all
          ${showNotifications ? 'bg-gray-100' : 'hover:bg-gray-100'}
          text-gray-600 hover:text-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-300
        `}
                onClick={toggleNotifications}
                aria-label="Notifications"
                aria-expanded={showNotifications}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="
            absolute top-0 right-0 
            w-2.5 h-2.5 bg-red-500 rounded-full
            border-2 border-white
          "></span>
                )}
            </button>

            {showNotifications && (
                <NotificationsModel onClose={() => setShowNotifications(false)} />
            )}
        </div>
    );
}
