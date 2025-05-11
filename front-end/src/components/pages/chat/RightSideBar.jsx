import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RightSideBar = ({ isGroup, chatId, onClose }) => {
    const users = useSelector(state => state.users.users);
    const groups = useSelector(state => state.groups.userGroups);
    const allMessages = useSelector(state => state.messages.messages);
    const allGroupMessages = useSelector(state => state.messages.groupMessages);

    const chatInfo = isGroup
        ? groups.find(group => group.id === +chatId)
        : users.find(u => u.id === +chatId);

    // Get all media files from messages
    const mediaFiles = useMemo(() => {
        const messages = isGroup
            ? allGroupMessages.filter(m => m.group_id === +chatId)
            : allMessages.filter(m =>
                (m.sender_id === +chatId && m.receiver_id === user.id) ||
                (m.receiver_id === +chatId && m.sender_id === user.id)
            );

        return messages.reduce((acc, message) => {
            if (message.media && message.media.length > 0) {
                return [...acc, ...message.media];
            }
            return acc;
        }, []);
    }, [allMessages, allGroupMessages, chatId, isGroup]);

    const [showMediaModal, setShowMediaModal] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    if (!chatInfo) return null;

    return (
        <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
            {/* Close button for mobile */}
            <div className="lg:hidden flex justify-end p-4">
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Profile Info */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col items-center">
                    <img
                        src={isGroup ? groupProfile(chatInfo.profile_image) : userProfile(chatInfo.profile_image)}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-xl font-bold">{chatInfo.name}</h2>
                    {!isGroup && (
                        <p className="text-gray-500">@{chatInfo.username}</p>
                    )}
                    {isGroup && (
                        <p className="text-gray-500 text-center mt-2">
                            {chatInfo.description || "No description available"}
                        </p>
                    )}
                </div>
            </div>

            {/* Media Section */}
            <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Media, files and links</h3>
                {mediaFiles.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                        {mediaFiles.slice(0, 6).map((media, index) => (
                            <div
                                key={index}
                                className="aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer"
                                onClick={() => {
                                    setSelectedMediaIndex(index);
                                    setShowMediaModal(true);
                                }}
                            >
                                <img
                                    src={media.url}
                                    alt={`Media ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                        {mediaFiles.length > 6 && (
                            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center cursor-pointer">
                                <span className="text-gray-500">+{mediaFiles.length - 6}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500">No media shared yet</p>
                )}
            </div>

            {/* Media Modal */}
            {showMediaModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
                        <button
                            onClick={() => setShowMediaModal(false)}
                            className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            initialSlide={selectedMediaIndex}
                            className="h-96"
                        >
                            {mediaFiles.map((media, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center justify-center h-full">
                                        <img
                                            src={media.url}
                                            alt={`Media ${index + 1}`}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightSideBar;