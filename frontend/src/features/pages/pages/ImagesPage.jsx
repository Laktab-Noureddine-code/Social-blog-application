

/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  ImageIcon,
  ChevronLeft,
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/shared/ui/dialog";

function ImagesGallery({ onBackClick }) {
  const state = useSelector((state) => state.page.medias);
  const images = state.filter((ele) => ele.type.includes("image"));
  const { id } = useParams();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setZoomLevel(1); // Reset zoom level when opening a new image
  };

  const handleDialogClose = () => {
    setSelectedImageIndex(null);
    setZoomLevel(1);
  };

  const navigateImage = (direction) => {
    if (selectedImageIndex === null) return;

    let newIndex = selectedImageIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setSelectedImageIndex(newIndex);
    setZoomLevel(1); // Reset zoom level when changing images
  };

  const handleZoom = (factor) => {
    setZoomLevel((prevZoom) => {
      const newZoom = prevZoom + factor;
      // Limit zoom between 0.5 and 3
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  const handleDownload = () => {
    if (selectedImageIndex === null) return;

    const image = images[selectedImageIndex];
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.title || `image-${selectedImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              All Photos
            </h2>
            {images.length > 0 && (
              <span className="text-sm text-gray-500 font-normal ml-2">
                ({images.length})
              </span>
            )}
          </div>
          <Link
            to={`/page/${id}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            onClick={onBackClick}
          >
            <ChevronLeft className="h-4 w-4" />
            View Less
          </Link>
        </div>

        {/* Content */}
        <div className="p-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title || `Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  {!image.url && <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />}

                  {/* Image title on hover */}
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium truncate">
                        {image.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-gray-500 font-medium text-lg mb-2">
                No Images Available
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
                {"You haven't added any images to your page yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && handleDialogClose()}
      >
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-none">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {selectedImageIndex !== null && (
              <>
                <div
                  className="relative overflow-auto max-h-[85vh] max-w-[85vw] flex items-center justify-center"
                  style={{ cursor: "grab" }}
                >
                  <img
                    src={images[selectedImageIndex].url || "/placeholder.svg"}
                    alt={
                      images[selectedImageIndex].title ||
                      `Image ${selectedImageIndex + 1}`
                    }
                    className="transition-transform duration-300"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      maxHeight: "85vh",
                      maxWidth: "85vw",
                    }}
                  />
                </div>

                {/* Image controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleZoom(0.25)}
                      className="text-white hover:text-blue-400 transition-colors"
                      disabled={zoomLevel >= 3}
                    >
                      <ZoomIn size={20} />
                    </button>
                    <button
                      onClick={() => handleZoom(-0.25)}
                      className="text-white hover:text-blue-400 transition-colors"
                      disabled={zoomLevel <= 0.5}
                    >
                      <ZoomOut size={20} />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <Download size={20} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </span>
                    <DialogClose className="text-white hover:text-blue-400 transition-colors">
                      <X size={24} />
                    </DialogClose>
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={() => navigateImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  onClick={() => navigateImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight size={24} />
                </button>

                {/* Image title */}
                {images[selectedImageIndex].title && (
                  <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                    <h3 className="text-white font-medium text-lg">
                      {images[selectedImageIndex].title}
                    </h3>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImagesGallery;

