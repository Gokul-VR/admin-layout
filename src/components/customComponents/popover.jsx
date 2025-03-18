import { useEffect } from "react";
import { useRef } from "react";

export const Popover = ({
  isOpen,
  onClose,
  children,
  className = "",
  style,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 rounded-xl border border-gray-200 bg-white shadow-lg ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
