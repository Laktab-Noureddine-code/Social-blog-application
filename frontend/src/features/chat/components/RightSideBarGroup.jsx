/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Users } from "lucide-react";
import { groupCover, userProfile } from "@/shared/helpers/helper";
import { Skeleton } from '@mui/material';
import { useState } from "react";
import MediasDialog from "./images/MediasDialog";
import { MdOutlineGroups } from "react-icons/md";

function RightSideBarGroup({ isRootPath, showRSB, setShowRSB }) {
    const { chatId } = useParams();
    const userGroupe = useSelector(state => state.groups.userGroups.find(fr => fr.id === +chatId));
    const loading = false;
    const messagesList = useSelector(state => state.messages.groupMessages);
    const medias = messagesList?.filter((message) => message?.media !== null)?.map(message => message?.media) || [];
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const ProfileContent = () => {
        if (loading || !userGroupe) {
            return (
                <div className="flex flex-col items-center">
                    <div className="relative w-full text-center pb-6">
                        <button
                            onClick={() => setShowRSB(false)}
                            className="absolute left-0 top-0 lg:hidden p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Group Cover Skeleton */}
                        <Skeleton variant="rectangular" width="100%" height={120} className="mx-auto mb-4" />

                        {/* Group Name Skeleton */}
                        <Skeleton variant="text" width={150} height={30} className="mx-auto mb-2" />

                        {/* Group Privacy Skeleton */}
                        <Skeleton variant="text" width={100} height={20} className="mx-auto mb-6" />

                        {/* Created By Skeleton */}
                        <div className="flex items-center gap-2 mb-6">
                            <Skeleton variant="circular" width={56} height={56} />
                            <div>
                                <Skeleton variant="text" width={60} height={15} className="mb-1" />
                                <Skeleton variant="text" width={100} height={20} />
                            </div>
                        </div>

                        {/* Members Section Skeleton */}
                        <div className="w-full mb-6">
                            <div className="flex items-center mb-3">
                                <Skeleton variant="circular" width={24} height={24} className="mr-2" />
                                <Skeleton variant="text" width={100} height={20} />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <Skeleton variant="circular" width={56} height={56} />
                                        <Skeleton variant="text" width={40} height={15} className="mt-1" />
                                        <Skeleton variant="text" width={50} height={12} />
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
                        <Link to={`/groups/${userGroupe.id}`}>
                            <div className="flex justify-center p-1 overflow-hidden mb-1">
                                <img
                                    src={groupCover(userGroupe.cover_image)}
                                    alt="group cover"
                                    className="lg:h-30 lg:w-full shadow-sm h-38 w-70 border object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                    )}

                    {/* Group Name */}
                    <h3 className="font-semibold text-lg">{userGroupe?.name}</h3>

                    {/* Group Privacy */}
                    <p className="text-sm text-gray-500 capitalize">
                        {userGroupe?.confidentiality === 'privé' ? 'Private Group' : 'Public Group'}
                    </p>
                </div>

                {/* Group Info */}
                <div className="w-full space-y-4 mb-6">
                    {/* Created by */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                            <Link to={`/profile/${userGroupe.creator.id}`}>
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 border">
                                    <img
                                        src={userProfile(userGroupe.creator.image_profile_url)}
                                        alt={userGroupe.creator.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Created by</p>
                            <p className="font-medium text-wrap">
                                {userGroupe.creator?.name || 'Unknown'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Members Section */}
                <div className="w-full mb-6">
                    {userGroupe.members.length > 1 && <div className="flex items-center mb-3">
                        <MdOutlineGroups size={20} className="mr-2 text-gray-500" />
                        <h4 className="font-medium text-sm">Group Members</h4>
                    </div>}

                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <div className="grid grid-cols-3 gap-3">
                                {userGroupe.members
                                    ?.filter(member => member.id !== userGroupe.creator?.id)
                                    ?.slice(0, 6)
                                    ?.map((member) => (
                                        <div key={member.id} className="flex flex-col items-center">
                                            <Link to={`/profile/${member.id}`} >
                                                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                                                    <img
                                                        src={userProfile(member.image_profile_url)}
                                                        alt={member.name}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </Link>
                                            <p className="font-medium text-xs mt-1 text-center">
                                                {member.name.split(' ')[0]}
                                            </p>
                                            <p className="text-xs text-gray-500 text-center capitalize">
                                                {member.pivot?.role === 'admin' ? 'Admin' : 'Member'}
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {userGroupe.members?.length > 7 && (
                                <button className="text-sm text-blue-800 mt-3 w-full text-center">
                                    Show All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                {medias.length > 0 && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Images</h4>
                            <button
                                className="text-sm text-blue-800"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Show All
                            </button>
                        </div>
                        <MediasDialog
                            isOpen={isDialogOpen}
                            setIsOpen={setIsDialogOpen}
                            mediaUrls={medias}
                        />
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