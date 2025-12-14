/* eslint-disable react/prop-types */

import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Popover({ trigger, children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block ">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-30 left-full ml-2 ${className}`}
        >
          <div className="bg-white text-gray-800 rounded-md shadow-lg min-w-[250px] overflow-hidden"></div>
          <div className="pt-2 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors z-30 absolute left-[-70px] "
              >
                <X size={16} />
              </button>
              {children}
          </div>
        </div>
      )}
    </div>
  );
}
