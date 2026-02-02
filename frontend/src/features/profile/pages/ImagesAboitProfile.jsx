/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ImageIcon, ChevronRight } from "lucide-react";

function ImagesAboitProfile({ setShowAllMedias }) {
  const state = useSelector((state) => state.profile.medias);
  const images = state.filter((ele) => ele.type.includes("image"));
  const { id } = useParams();

  return (
    <div className="my-4">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">Photos</h2>
            {images.length > 3 && (
              <span className="text-sm text-gray-500 font-normal">
                ({images.length})
              </span>
            )}
          </div>
          <Link
            to={`/profile/${id}/images`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            onClick={setShowAllMedias}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        <div className="p-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title || `Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  {!image.url && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-gray-500 font-medium mb-1">No Images</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Images you add will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImagesAboitProfile;
