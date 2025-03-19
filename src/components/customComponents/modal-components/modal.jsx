import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
  centered = false,
  fullScreen = false,
}) {
  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`
          flex min-h-full items-center justify-center ${
            fullScreen ? "" : "p-4"
          } text-center
        `}
      >
        <div
          className={`
            relative transform overflow-hidden bg-white text-left shadow-xl transition-all
            ${
              fullScreen
                ? "fixed inset-0 w-full h-full"
                : "w-full max-w-md rounded-lg"
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
