const SkeletonShowPost = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Profile picture */}
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          {/* Username and time */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Close button */}
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Main image */}
      <div className="aspect-[4/3] w-full bg-gray-200 animate-pulse"></div>

      {/* Actions bar */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-4">
          {/* Like button */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          {/* Share button */}
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Comments section */}
      <div className="p-4">
        {/* Comment input */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex-1 h-10 bg-gray-100 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonShowPost;
