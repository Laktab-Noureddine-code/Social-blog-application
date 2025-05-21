/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AtSign } from "lucide-react";
import { userProfile } from "../../../helpers/helper";
import { Skeleton } from '@mui/material';

function RightSideBar({ isRootPath, showRSB, setShowRSB }) {
    const { chatId } = useParams();
    const friend = useSelector(state => state.relatedUsers.list.find(fr => fr.id === +chatId));
    const loading = useSelector(state => state.relatedUsers.friendsLoading);
    const messagesList = useSelector(state => state.messages.messages)
    // Safely filter media files
    const medias = messagesList?.filter((message) => message?.media !== null)?.map(message => message?.media) || [];
    const ProfileContent = () => {
        if (loading || !friend) {
            return (
                <div className="flex flex-col items-center">
                    {/* Loading Skeleton */}
                    <div className="relative w-full text-center pb-6">
                        <button
                            onClick={() => setShowRSB(false)}
                            className="absolute left-0 top-0 lg:hidden p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Profile Avatar Skeleton */}
                        <div className="relative inline-block">
                            <Skeleton variant="circular" width={80} height={80} className="mx-auto mb-2" />
                        </div>

                        {/* Name Skeleton */}
                        <Skeleton variant="text" width={120} height={30} className="mx-auto" />

                        {/* Email Skeleton */}
                        <div className="w-full space-y-4 mb-6">
                            <div className="flex items-center">
                                <Skeleton variant="circular" width={40} height={40} className="mr-2" />
                                <div>
                                    <Skeleton variant="text" width={40} height={15} />
                                    <Skeleton variant="text" width={150} height={20} />
                                </div>
                            </div>
                        </div>

                        {/* Media Section Skeleton */}
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-3">
                                <Skeleton variant="text" width={80} height={20} />
                                <Skeleton variant="text" width={50} height={15} />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[...Array(6)].map((_, index) => (
                                    <Skeleton key={index} variant="rectangular" width="100%" height={80} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center">
                {/* Profile Header */}
                <div className="relative w-full text-center pb-6">
                    <button
                        onClick={() => setShowRSB(false)}
                        className="absolute left-0 top-0 lg:hidden p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Profile Avatar */}
                    <div className="relative inline-block">
                        <div className="lg:h-20 lg:w-20 h-30 w-30 rounded-full overflow-hidden bg-gray-200 mx-auto mb-2">
                            <img src={userProfile(friend.image_profile_url)} alt="user img" loading="lazy" />
                        </div>
                    </div>

                    {/* User Name and ID */}
                    <h3 className="font-semibold text-lg">{friend?.name || 'Unknown User'}</h3>
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-4 mb-6">
                    {friend?.email && (
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-blue-500 mr-1">
                                <AtSign size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-wrap">{friend.email}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Media Section */}
                {medias.length > 0 && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Attachments</h4>
                            <button className="text-sm text-blue-800">See all</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {medias.slice(0, 6).map((media, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        src={`http://localhost:8000/storage/${media}`}
                                        alt="media"
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };
    // Desktop version (always visible on lg screens)
    const DesktopSidebar = () => (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-65 border-l border-gray-200 bg-white p-4 overflow-y-auto">
            <ProfileContent />
        </div>
    );

    // Mobile version (shows when showRSB is true)
    const MobileSidebar = () => (
        <div className="fixed inset-0 z-50 bg-white p-4 block lg:hidden overflow-y-auto">
            <ProfileContent />
        </div>
    );

    if (isRootPath) return null;

    return (
        <>
            <DesktopSidebar />
            {showRSB && <MobileSidebar />}
        </>
    );
}

export default RightSideBar;