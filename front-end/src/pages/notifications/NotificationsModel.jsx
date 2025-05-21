/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { Bell, Heart, MessageSquare, Users, UserPlus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useNotifications from '../../hooks/useNotifications';

function NotificationsModel({ onClose }) {
    useNotifications()
    const notifications = [
        {
            id: 1,
            type: 'like',
            user: 'John Doe',
            action: 'a aimé votre publication',
            time: 'il y a 5 min',
            read: false,
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            id: 2,
            type: 'comment',
            user: 'Sarah Smith',
            action: 'a commenté votre photo',
            time: 'il y a 1 heure',
            read: false,
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
            id: 3,
            type: 'group',
            user: 'Tech Enthusiasts',
            action: 'vous a invité à rejoindre le groupe',
            time: 'il y a 3 heures',
            read: true,
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        },
        {
            id: 4,
            type: 'friend',
            user: 'Mike Johnson',
            action: 'vous a envoyé une demande d\'ami',
            time: 'il y a 1 jour',
            read: true,
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
        }
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'like': return <Heart className="w-4 h-4 text-gray-500" />;
            case 'comment': return <MessageSquare className="w-4 h-4 text-gray-500" />;
            case 'group': return <Users className="w-4 h-4 text-gray-500" />;
            case 'friend': return <UserPlus className="w-4 h-4 text-gray-500" />;
            default: return <Bell className="w-4 h-4 text-gray-500" />;
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
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-2 flex items-start gap-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback>{notification.user.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    {getIcon(notification.type)}
                                    <p className="text-sm font-medium">{notification.user}</p>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.action}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>

                            {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-3 border-t text-center">
                    <Button variant="ghost" className="text-blue-500 hover:text-blue-700">
                        Voir toutes les notifications
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default function NotificationBell() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
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
        setShowNotifications(prev => {
            if (prev) setHasUnread(false);
            return !prev;
        });
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
                {hasUnread && (
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