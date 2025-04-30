function ProfileHeader() {
    return (
        <div className=" bg-white rounded-2xl overflow-hidden shadow-lg relative">
            <div className="" >
                <div className="h-30 md:h-40 lg:h-70 ">
                    <img src="https://images.unsplash.com/photo-1603983732011-caaf6ca67a3e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-full w-full object-cover " alt="groupe cover Image" loading="lazy" />
                </div>
                <button className="absolute right-4 top-4 bg-black/50 text-white font-bold px-3 py-1 rounded-md text-sm ">
                    Edit Profile
                </button>
            </div>
            <div className="md:block hidden -mt-20 ml-5 flex w-full items-center gap-4">
                <div className="">
                    <div className="rounded-full border-4 bg-white border-gray-200 overflow-hidden h-30 w-30">
                        <img
                            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"    
                            alt="Profile"
                            className="w-full h-full object-cover bg-white"
                        />
                    </div>
                </div>
                <div className="self-start pt-2">
                    <h1 className="text-4xl text-white  font-bold mt-2">Ahmad Nur Fawaid</h1>
                </div>
            </div>
            <div className="md:hidden flex w-full items-center gap-4">
                <div className="">
                    <div className="rounded-full  border-4 bg-white border-gray-200 overflow-hidden h-30 w-30">
                        <img
                            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"    
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="self-start pt-2">
                    <h1 className="text-4xl text-white  font-bold mt-2">Ahmad Nur Fawaid</h1>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-end  -mt-4 pb-2 px-5 border-b border-gray-200">
                <div className="mr-6 mb-2">
                    <span className="text-gray-500 font-bold">Post</span>
                    <div className="font-bold text-center">10.3k</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500 font-bold">Followers</span>
                    <div className="font-bold text-center">2,564</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500 font-bold">Following</span>
                    <div className="font-bold text-center">3,154</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500 font-bold">Likes</span>
                    <div className="font-bold text-center">12.2k</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500 font-bold">Photos</span>
                    <div className="font-bold text-center">35</div>
                </div>
                <div className="mr-6 mb-2">
                    <span className="text-gray-500 font-bold">Videos</span>
                    <div className="font-bold text-center">24</div>
                </div>
                <div className="mb-2">
                    <span className="text-gray-500 font-bold">Tagged</span>
                    <div className="font-bold text-center">18</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
