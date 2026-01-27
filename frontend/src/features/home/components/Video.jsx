/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Player, ControlBar, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useRef } from "react";


const Video = ({ videoUrl, showVideo = false, style = {} }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (!showVideo) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playerRef.current?.play();
            playerRef.current.muted = false;
          } else {
            playerRef.current?.pause();
            playerRef.current.muted = true;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [showVideo]);

  if (!showVideo) {
    // Only show a black background with play icon
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          position: "relative",
          ...style,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="rgba(0,0,0,0.6)"
              stroke="#fff"
              strokeWidth="2"
            />
            <polygon points="26,20 46,32 26,44" fill="#fff" />
          </svg>
        </span>
      </div>
    );
  }

  // Show the video and autoplay
  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto my-5 bg-white rounded-lg shadow-sm max-h-[80dvh]"
    >
      <div className="p-1 max-h-[80dvh]">
        <div className="relative w-full bg-black rounded-lg overflow-hidden max-h-[80dvh]">
          <Player
           
            ref={playerRef}
            playsInline
            src={videoUrl}
            fluid={true}
            // muted={true}
            autoPlay={true}
            muted={true}
            className="w-full h-full max-h-[80dvh] object-cover"
          >
            <BigPlayButton position="center" />
            <ControlBar />
          </Player>
        </div>
      </div>
    </div>
  );
};

export default Video;
