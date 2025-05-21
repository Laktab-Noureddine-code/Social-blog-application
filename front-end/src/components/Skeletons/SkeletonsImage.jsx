/* eslint-disable react/prop-types */
const ImageSkeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}>
      <div className="w-full h-full min-h-[200px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
    </div>
  );
};

export default ImageSkeleton;
