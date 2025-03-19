import React from "react";

const LoadingButton = ({
  children,
  size = "medium",
  className = "bg-[#111010] hover:bg-[#333335] text-white",
  isLoading = false,
  ...props
}) => {
  // Define size variants
  const sizeVariants = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-2 text-base",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#333335] focus:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 cursor-pointer
        ${sizeVariants[size]} ${className}
      `}
      // style={{ backgroundColor: bgColor }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          {/* Loading Spinner */}
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {/* Loading Text */}
          {children}
        </>
      ) : (
        // Normal Button Text
        children
      )}
    </button>
  );
};

export default LoadingButton;
