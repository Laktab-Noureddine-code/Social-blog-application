const UserCard = ({ user }) => {
    return (
        <div className="max-w-xs bg-white shadow rounded-lg overflow-hidden mb-4 mx-2">
            {/* Profile Image */}
            <div className="flex flex-col items-center pt-6 pb-2">
                <div className="bg-gray-400 rounded-full w-24 h-24 mb-2"></div>
                <div className="w-16 h-16 bg-gray-400 rounded-full -mt-12"></div>
            </div>

            {/* User Name */}
            <div className="px-4 pb-2 text-center">
                <h3 className="font-medium text-base">{user.name}</h3>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-4">
                <button className="w-full bg-blue-100 text-blue-600 py-2 rounded mb-2 text-sm font-medium hover:bg-blue-200">
                    Add Friend
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded text-sm font-medium hover:bg-gray-300">
                    Remove
                </button>
            </div>
        </div>
    );
};
export default UserCard