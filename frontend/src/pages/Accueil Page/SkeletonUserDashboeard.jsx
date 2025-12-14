import { Skeleton } from "@mui/material";

const SkeletonUserDashboard = () => {
  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-lg animate-pulse">
      {/* Avatar skeleton */}
      <Skeleton variant="circular" width={32} height={32} />

      {/* Name skeleton */}
      <Skeleton variant="text" width={120} height={24} />
    </div>
  );
};

export default SkeletonUserDashboard;
