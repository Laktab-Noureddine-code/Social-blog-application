import React from "react";

const SkeletonAdmins = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>

      {/* Title placeholder */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

      {/* Interactions container */}
      <div className="flex items-center justify-between">
        {/* Like and comment counts */}
        <div className="flex items-center space-x-4">
          {/* Like count */}
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
            <div className="w-8 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Comment count */}
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
            <div className="w-8 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Bookmark button */}
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonAdmins;
