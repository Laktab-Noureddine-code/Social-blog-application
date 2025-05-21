/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AtSign, Users } from "lucide-react";
import { groupCover, userProfile } from "../../../helpers/helper";
import { Skeleton } from '@mui/material';

function RightSideBarGroup({ isRootPath, showRSB, setShowRSB }) {
    const { chatId } = useParams();
    const userGroupe = useSelector(state => state.groups.userGroups.find(fr => fr.id === +chatId));
    const loading = false;
    // Safely filter media files
    const messagesList = useSelector(state => state.messages.groupMessages);
    const medias = messagesList?.filter((message) => message?.media !== null)?.map(message => message?.media) || [];
    const ProfileContent = () => {
        if (loading || !userGroupe) {
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

                        {/* Members Section Skeleton */}
                        <div className="w-full mb-6">
                            <div className="flex items-center mb-3">
                                <Skeleton variant="circular" width={24} height={24} className="mr-2" />
                                <Skeleton variant="text" width={100} height={20} />
                            </div>
                            <div className="space-y-2">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex items-center">
                                        <Skeleton variant="circular" width={40} height={40} className="mr-2" />
                                        <Skeleton variant="text" width={120} height={20} />
                                    </div>
                                ))}
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

                    {/* Group Cover Image */}
                    {userGroupe.cover_image && (
                        <div className="flex justify-center   p-1  overflow-hidden mb-1">
                            <img
                                src={groupCover(userGroupe.cover_image)}
                                alt="group cover"
                                className="lg:h-30 lg:w-30 h-38 w-38 border object-cover rounded-full"
                                loading="lazy"
                            />
                        </div>
                    )}

                    {/* Group Name */}
                    <h3 className="font-semibold text-lg">{userGroupe?.name}</h3>

                    {/* Group Privacy */}
                    <p className="text-sm text-gray-500 capitalize">
                        {userGroupe?.confidentiality === 'privé' ? 'Groupe Privé' : 'Group Public'}
                    </p>
                </div>

                {/* Group Info */}
                <div className="w-full space-y-4 mb-6">
                    {/* Created by */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 border">
                                <img
                                    src={userGroupe.creator.image_profile_url}
                                    alt={userGroupe.creator.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Créé par</p>
                            <p className="font-medium text-wrap">
                                {userGroupe.creator?.name || 'Unknown'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Members Section */}
                <div className="w-full mb-6">
                    {userGroupe.members.length > 1 && <div className="flex items-center mb-3">
                        <Users size={20} className="mr-2 text-blue-500" />
                        <h4 className="font-medium text-sm">Group members</h4>
                    </div>}

                    <div className="flex items-start gap-4">
                        {/* Members Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-3 gap-3">
                                {userGroupe.members
                                    ?.filter(member => member.id !== userGroupe.creator?.id) // Exclude creator from grid
                                    ?.slice(0, 6) // Show max 6 members
                                    ?.map((member) => (
                                        <div key={member.id} className="flex flex-col items-center">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                                                <img
                                                    src={userProfile(member.image_profile_url)}
                                                    alt={member.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="font-medium text-xs mt-1 text-center">
                                                {member.name.split(' ')[0]}
                                            </p>
                                            <p className="text-xs text-gray-500 text-center capitalize">
                                                {member.pivot?.role === 'admin' ? 'Admin' : 'Member'}
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {/* "Afficher tous" button */}
                            {userGroupe.members?.length > 7 && ( // Creator + 6 members = 7
                                <button className="text-sm text-blue-800 mt-3 w-full text-center">
                                    Afficher tous
                                </button>
                            )}
                        </div>
                    </div>
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

export default RightSideBarGroup;