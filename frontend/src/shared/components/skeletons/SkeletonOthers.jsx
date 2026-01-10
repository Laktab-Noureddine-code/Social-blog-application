const SkeletonOthers = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 flex-wrap justify-between">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-10 bg-white rounded-lg shadow-sm w-full md:w-[46%]  lg:w-[30%]"
        >
          <div className="flex items-center gap-3">
            {/* Profile Avatar Skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            </div>

            {/* Name Skeleton */}
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Invite Button Skeleton */}
          <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonOthers;
