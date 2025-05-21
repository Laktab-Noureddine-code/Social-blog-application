import { Skeleton } from "@mui/material";

const SkeletonPost = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {/* Header with profile info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={40} height={40} />
          <div>
            <Skeleton width={120} height={20} />
            <Skeleton width={80} height={15} />
          </div>
        </div>
        <Skeleton width={24} height={24} />
      </div>

      {/* Post text */}
      <div className="mb-3">
        <Skeleton width="40%" height={20} />
      </div>

      {/* Post image */}
      <div className="mb-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Engagement stats */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton width={60} height={20} />
        <span className="text-gray-400">•</span>
        <Skeleton width={100} height={20} />
      </div>

      {/* Action buttons */}
      <div className="flex justify-between border-t border-gray-100 pt-3">
        <Skeleton width={80} height={30} />
        <Skeleton width={80} height={30} />
        <Skeleton width={80} height={30} />
      </div>
    </div>
  );
};

export default SkeletonPost;
