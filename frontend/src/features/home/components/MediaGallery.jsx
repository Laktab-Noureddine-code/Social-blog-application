
import { useState, useEffect } from "react";
import ImageSkeleton from "@/shared/components/skeletons/SkeletonsImage";
import Video from "./Video";
import { ImageOff } from "lucide-react";

/* eslint-disable react/prop-types */

function MediaGallery({ media, onClick }) {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (!media) return;

    media.forEach((item, index) => {
      if (!item.type.toString().includes("video")) {
        const img = new Image();
        img.src = item.url;
        img.onload = () => {
          setLoadedImages((prev) => ({
            ...prev,
            [index]: "loaded",
          }));
        };
        img.onerror = () => {
          setLoadedImages((prev) => ({
            ...prev,
            [index]: "error",
          }));
        };
      }
    });
  }, [media]);

  if (!media || media.length === 0) return null;

  const renderMedia = (item, idx) => {
    console.log(item.url)
    if (item.type.toString().includes("video")) {
      return (
        <div
          className="w-full h-full bg-black rounded-md relative flex items-center justify-center"
          onClick={()=>onClick(0)}
        >
          {/* Circle */}
          <div className="w-20 h-20 rounded-full bg-gray-800 bg-opacity-30 flex items-center justify-center">
            {/* Triangle (play icon) */}
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1" />
          </div>
          {/* <Video videoUrl={media[0].url}  onClick={() => onClick(0)} />; */}
        </div>
      );

      // return <Video videoUrl={item.url} description={"my first video"} />;
    } else {
      return loadedImages[idx] === "loaded" ? (
        <img
          key={idx}
          src={item.url}
          alt={`Post image ${idx + 1}`}
          className="w-full h-full object-cover rounded-md"
        />
      ) : loadedImages[idx] === "error" ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
      ) : (
        <ImageSkeleton />
      );
    }
  };

  if (media.length === 1) {
    return (
      <div
        className="w-full cursor-pointer"
        onDoubleClick={() => loadedImages[0] === "loaded" && onClick(0)}
      >
        {media[0].type.toString().includes("video") ? (
          <div className="w-full h-auto cursor-pointer flex justify-center items-center ">
            <Video videoUrl={media[0].url} showVideo={true}  />
          </div>
        ) : (
          renderMedia(media[0], 0)
        )}
      </div>
    );
  } else if (media.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 overflow-hidden">
        {media.map((item, idx) => (
          <div
            key={idx}
            className="w-full h-48 cursor-pointer flex justify-center items-center"
            onClick={() => loadedImages[idx] === "loaded" && onClick(idx)}
          >
            {renderMedia(item, idx)}
          </div>
        ))}
      </div>
    );
  } else if (media.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 overflow-hidden">
        <div
          className="w-full h-96 cursor-pointer flex justify-center items-center"
          onClick={() => loadedImages[0] === "loaded" && onClick(0)}
        >
          {renderMedia(media[0], 0)}
        </div>
        <div className="grid grid-rows-2 gap-1 overflow-hidden">
          <div
            className="w-full h-48 cursor-pointer overflow-hidden flex justify-center items-center"
            onClick={() => loadedImages[1] === "loaded" && onClick(1)}
          >
            {renderMedia(media[1], 1)}
          </div>
          <div
            className="w-full h-48 cursor-pointer overflow-hidden flex justify-center items-center "
            onClick={() => loadedImages[2] === "loaded" && onClick(2)}
          >
            {renderMedia(media[2], 2)}
          </div>
        </div>
      </div>
    );
  } else {
    const displayMedia = media.slice(0, 4);
    const remainingCount = media.length - 4;

    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-96 overflow-hidden">
        {displayMedia.map((item, idx) => (
          <div
            key={idx}
            className={`w-full h-full ${
              idx === 0
                ? "rounded-tl-md"
                : idx === 1
                ? "rounded-tr-md"
                : idx === 2
                ? "rounded-bl-md"
                : "rounded-br-md relative"
            } cursor-pointer`}
            onClick={() => loadedImages[idx] === "loaded" && onClick(idx)}
          >
            {idx === 3 && remainingCount > 0 && loadedImages[idx] === "loaded" ? (
              <>
                <div className="brightness-50">{renderMedia(item, idx)}</div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                  +{remainingCount}
                </div>
              </>
            ) : (
              renderMedia(item, idx)
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default MediaGallery;