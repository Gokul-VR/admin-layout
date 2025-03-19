import React from "react";

const Button = ({
  children,
  size = "medium",
//   bgColor = "#111010",
  className = "bg-[#111010] hover:bg-[#333335] text-white",
  ...props
}) => {
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
    //   style={{ backgroundColor: bgColor }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
