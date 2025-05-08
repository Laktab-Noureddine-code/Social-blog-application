import Video from "./Video";

/* eslint-disable react/prop-types */

function MediaGallery({ media, onClick }) {
  if (!media || media.length === 0) return null;

  const renderMedia = (item, idx) => {
    if (item.type.toString().includes('video')) {
      return (
        <Video
          // videoUrl={media[0].url}
          videoUrl={item.url}
          description={"my first video"}
        />
      );
    } else {
      return (
        <img
          key={idx}
          // src={`/api/public/storage/posts/${item.body}`}
          src={item.url}
          alt={`Post image ${idx + 1}`}
          className="w-full h-full object-cover rounded-md"
        />
      );
    }
  };

  if (media.length === 1) {
    return (
      <div className="w-full cursor-pointer" onClick={() => onClick(0)}>
        {media[0].type.toString().includes("video") ? (
          <div className="w-full h-auto cursor-pointer flex justify-center items-center">
            <Video videoUrl={media[0].url} showVideo={true} />
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
            onClick={() => onClick(idx)}
          >
            {renderMedia(item, idx)}
          </div>
        ))}
      </div>
    );
  } else if (media.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 overflow-hidden">
        <div className="w-full h-96 cursor-pointer flex justify-center items-center" onClick={() => onClick(0)} >
          {renderMedia(media[0], 0)}
        </div>
        <div className="grid grid-rows-2 gap-1 overflow-hidden">
          <div
            className="w-full h-48 cursor-pointer overflow-hidden flex justify-center items-center"
            onClick={() => onClick(1)}
          >
            {renderMedia(media[1], 1)}
          </div>
          <div
            className="w-full h-48 cursor-pointer overflow-hidden flex justify-center items-center"
            onClick={() => onClick(2)}
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
            onClick={() => onClick(idx)}
          >
            {idx === 3 && remainingCount > 0 ? (
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
