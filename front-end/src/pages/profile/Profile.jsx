import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Camera, Link } from "lucide-react";
import ProfileHeader from "../../components/pages/profile/ProfileHeader";
import ProfileAbout from "../../components/pages/profile/ProfileAbout";

export default function Profile() {
    const [commentText, setCommentText] = useState("");

    return (
        <div className="md:max-w-4xl mx-auto py-6 w-full min-h-screen">
            <div className="w-64">
            </div>
            {/* Main content area */}
            <div className="flex flex-col">
                {/* Cover photo and profile section */}
                <div className="w-full">
                    <ProfileHeader />
                    {/* About me section */}
                    <ProfileAbout />

                    {/* Profile info section */}
                    <div className="bg-white pb-4 shadow-sm mb-4">
                        <div>

                            {/* Photos and videos section */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center">
                                    <div className="font-medium">Photos and Videos</div>
                                    <button className="text-blue-500 text-sm">SEE ALL</button>
                                </div>

                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    <div className="aspect-square rounded-md overflow-hidden">
                                        <img
                                            src="/api/placeholder/120/120"
                                            alt="Gallery"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="aspect-square rounded-md overflow-hidden">
                                        <img
                                            src="/api/placeholder/120/120"
                                            alt="Gallery"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="aspect-square rounded-md overflow-hidden">
                                        <img
                                            src="/api/placeholder/120/120"
                                            alt="Gallery"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post something section */}
                    <div className="bg-white rounded-md shadow-sm mb-4 p-4">
                        <div className="text-sm font-medium mb-4">Post Something</div>
                        <div className="flex mb-2">
                            <div className="mr-2">
                                <div className="h-8 w-8 rounded-full overflow-hidden">
                                    <img
                                        src="/api/placeholder/32/32"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="What's on your mind?"
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-gray-200 text-gray-500 rounded-full p-2 mx-1">
                                <Camera size={16} />
                            </button>
                            <button className="bg-gray-200 text-gray-500 rounded-full p-2 mx-1">
                                <Link size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Posts feed */}
                    <div className="bg-white rounded-md shadow-sm mb-4">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                    <img
                                        src="/api/placeholder/40/40"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium">Ahmad Nur Fawaid</div>
                                    <div className="text-xs text-gray-500">Posted on Earth 3 hours ago</div>
                                </div>
                                <button className="ml-auto">
                                    <MoreHorizontal size={18} className="text-gray-500" />
                                </button>
                            </div>

                            <p className="mt-2 text-sm">
                                Pleased to Earth a meaningful feesh last few days
                            </p>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex space-x-6">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <MessageCircle size={18} className="mr-1" />
                                        <span>7 Comments</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Heart size={18} className="mr-1" />
                                        <span>12 Likes</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Share2 size={18} className="mr-1" />
                                    <span>5 Share</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-b border-gray-100">
                            <div className="flex">
                                <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                    <img
                                        src="/api/placeholder/32/32"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm"
                                        placeholder="Write your comment..."
                                    />
                                    <div className="absolute right-3 top-2 flex">
                                        <button className="text-gray-400 mx-1">
                                            <Heart size={16} />
                                        </button>
                                        <button className="text-gray-400 mx-1">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second post */}
                    <div className="bg-white rounded-md shadow-sm mb-4">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                    <img
                                        src="/api/placeholder/40/40"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium">Ahmad Nur Fawaid</div>
                                    <div className="text-xs text-gray-500">Posted on Earth 5 hours ago</div>
                                </div>
                                <button className="ml-auto">
                                    <MoreHorizontal size={18} className="text-gray-500" />
                                </button>
                            </div>

                            <p className="mt-2 text-sm">
                                One of the perks of working in an international company is sharing knowledge with your colleagues.
                            </p>

                            <div className="mt-3 rounded-md overflow-hidden">
                                <img
                                    src="/api/placeholder/600/300"
                                    alt="Post image"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex space-x-6">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <MessageCircle size={18} className="mr-1" />
                                        <span>5 Comments</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Heart size={18} className="mr-1" />
                                        <span>23 Likes</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Share2 size={18} className="mr-1" />
                                    <span>7 Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right sidebar */}
            <div className="hidden md:block w-64 bg-white p-4 border-l border-gray-200">
            </div>
        </div>
    );
}