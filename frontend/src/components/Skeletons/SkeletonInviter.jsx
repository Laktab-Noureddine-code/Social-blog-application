const SkeletonInviter = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm w-full">
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Name Skeleton */}
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>

          {/* Status Badge Skeleton */}
          <div className="h-4 w-16 bg-orange-100 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Renvoyer Button Skeleton */}
        <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse"></div>

        {/* Annuler Button Skeleton */}
        <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonInviter;
