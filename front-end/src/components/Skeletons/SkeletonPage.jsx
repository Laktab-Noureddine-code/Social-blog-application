const SkeletonPages = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Header avec avatar et info */}
      <div className="flex items-center space-x-3">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        <div className="space-y-2">
          {/* Nom skeleton */}
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          {/* Abonnés skeleton */}
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Actions buttons */}
      <div className="flex justify-between items-center border-t border-b py-4">
        <div className="flex-1 text-center">
          <div className="h-5 w-20 bg-blue-100 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="flex-1 text-center border-x px-4">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="flex-1 text-center">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Zone de création de post */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-72 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 w-full bg-blue-100 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonPages;
