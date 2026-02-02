/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Film,
  PlayCircle,
  X,
  Maximize2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/shared/ui/dialog";

function VideosGalleryProfile({ onBackClick }) {
  const state = useSelector((state) => state.profile.medias);
  const videos = state.filter((ele) => ele.type.includes("video"));
  const { id } = useParams();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleDialogClose = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="my-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              All Videos
            </h2>
            {videos.length > 0 && (
              <span className="text-sm text-gray-500 font-normal ml-2">
                ({videos.length})
              </span>
            )}
          </div>
          <Link
            to={`/profile/${id}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            onClick={onBackClick}
          >
            <ChevronLeft className="h-4 w-4" />
            Show Less
          </Link>
        </div>

        {/* Content */}
        <div className="p-4">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-video cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=200&width=350"
                  />

                  {/* Play overlay - always visible but more prominent on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>

                  {/* Video title (optional) */}
                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-white text-sm font-medium">
                      {video.title}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <Film className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-gray-500 font-medium text-lg mb-2">
                No Videos Available
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
                {"You haven't added any videos to your profile yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Video Dialog */}
      <Dialog
        open={selectedVideo !== null}
        onOpenChange={(open) => !open && handleDialogClose()}
      >
        <DialogContent className="w-[95vw] h-[95vh] p-0 bg-black border-none overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center bg-black ">
            {selectedVideo && (
              <>
                <video
                  ref={videoRef}
                  src={selectedVideo.url}
                  className="max-w-[100%] max-h-[95vh] object-cover"
                  autoPlay
                  controls={false}
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Custom video controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {isPlaying ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <Maximize2 size={20} />
                    </button>
                    <DialogClose className="text-white hover:text-blue-400 transition-colors">
                      <X size={24} />
                    </DialogClose>
                  </div>
                </div>

                {/* Video title */}
                {selectedVideo.title && (
                  <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                    <h3 className="text-white font-medium text-lg">
                      {selectedVideo.title}
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

export default VideosGalleryProfile;
