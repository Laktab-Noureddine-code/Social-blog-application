function ProfileHeader() {
    return (
        <div className=" bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-400">
                <button className="absolute right-4 top-4 bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                    Edit Profile
                </button>
            </div>
            <div className="relative">
                <div className="absolute -top-14 left-0 lg:left-4">
                    <div className="rounded-full border-4 border-white overflow-hidden h-24 w-24">
                        <img
                            src="/api/placeholder/96/96"    
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="pt-14">
                    <h1 className="text-xl font-bold mt-2">Ahmad Nur Fawaid</h1>
                    <p className="text-gray-500 text-sm">@fawaid</p>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap mt-4 pb-2 border-b border-gray-200">
                <div className="mr-6 mb-2">
                    <span className="text-blue-500 font-bold">Post</span>
                    <div className="font-bold">10.3k</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500">Followers</span>
                    <div className="font-bold">2,564</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500">Following</span>
                    <div className="font-bold">3,154</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500">Likes</span>
                    <div className="font-bold">12.2k</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500">Photos</span>
                    <div className="font-bold">35</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500">Videos</span>
                    <div className="font-bold">24</div>
                </div>
                <div className="mb-2">
                    <span className="text-gray-500">Tagged</span>
                    <div className="font-bold">18</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
