/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";

export default function Text({
  text,
  className = "",
  buttonStyle = "minimal", // Options: "minimal", "subtle", "text-only", "arrow"
}) {
  const textRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = textRef.current;
      if (el && el.scrollHeight > 50) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [text]);

  // Button style variants
  const buttonStyles = {
    minimal: "text-gray-500 hover:text-gray-700 text-xs font-medium",
    subtle: "text-gray-500 hover:text-gray-800 text-xs italic",
    "text-only": "text-gray-400 hover:text-gray-600 text-xs",
    arrow:
      "text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center gap-1",
  };

  const selectedButtonStyle = buttonStyles[buttonStyle] || buttonStyles.minimal;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={textRef}
        className={`prose prose-sm max-w-none text-gray-700 leading-relaxed ${
          !isExpanded && isOverflowing ? "line-clamp-2" : ""
        }`}
        style={{
          maxHeight: !isExpanded && isOverflowing ? "50px" : "none",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {text}
      </div>

      {/* Gradient fade effect when text is truncated */}
      {!isExpanded && isOverflowing && (
        <div
          className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}

      {isOverflowing && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`mt-1 ${selectedButtonStyle}`}
          aria-expanded={isExpanded}
        >
          {buttonStyle === "arrow" ? (
            <>
              {isExpanded ? (
                <>
                  Show less
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </>
              ) : (
                <>
                  Show more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </>
              )}
            </>
          ) : isExpanded ? (
            "Show less"
          ) : (
            "Show more"
          )}
        </button>
      )}
    </div>
  );
}
