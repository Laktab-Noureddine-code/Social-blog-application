
const SkeletonFollowers = () => {
  return (
    <div className="p-4">
      {/* Header with count */}
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse mr-2"></div>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-8 h-6 bg-purple-100 rounded-full ml-2 animate-pulse"></div>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>

      {/* Followers list */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div>
                {/* Name */}
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                {/* Subscription time */}
                <div className="h-4 w-40 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Remove button */}
            <div className="h-8 w-24 bg-red-100 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonFollowers;
