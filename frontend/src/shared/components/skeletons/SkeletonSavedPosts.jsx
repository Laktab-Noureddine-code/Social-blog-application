const SkeletonSavedPosts = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      </div>

      <div className="p-4">
        {/* Titre skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>

        {/* Interactions skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Like count skeleton */}
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Comment count skeleton */}
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Bookmark icon skeleton */}
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSavedPosts;
