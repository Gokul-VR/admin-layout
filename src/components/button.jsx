import React from "react";
import { motion } from "framer-motion";
const Button = ({
  onClick,
  label,
  fullWidth = false,
  variant = "default",
  bgLight = false,
  disabled = false,
  icon,
  customColors,
}) => {
  const baseClasses =
    "transition-colors flex items-center justify-center gap-3 rounded md:rounded-md text-xs font-bold md:text-sm md:font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-3 md:px-4 md:py-2 cursor-pointer";

  const fullWidthClass = fullWidth ? "w-full text-center" : "";

  const variantClasses = {
    default: "bg-indigo-500 text-white hover:bg-indigo-600",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-slate-300 bg-white hover:bg-slate-100",
    secondary: "bg-slate-700 text-white hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-800 font-semibold",
    link: "text-blue-600 underline hover:text-blue-800",
    clear:
      "bg-transparent border border-neutral-700 text-neutral-100 hover:bg-neutral-800/50",
    clear_dark:
      "bg-transparent border border-neutral-700 text-neutral-100 hover:text-[#f05555]",
    // clear: "bg-transparent border",
    // clear_dark: "bg-transparent border",
  };
  const dynamicStyles = {
    clear: {
      borderColor: customColors.border,
      color: customColors.textSecondaryColor,
      backgroundColor: "transparent",
    },
    clear_dark: {
      borderColor: customColors.border,
      color: customColors.textPrimaryColor,
      backgroundColor: "transparent",
    },
  };

  const hoverStyles = {
    clear: {
      color: customColors.textPrimaryColor,
      borderColor: customColors.textPrimaryColor,
    },
    clear_dark: {
      borderColor: "#f05555",
      color: "#f05555",
    },
  };
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${fullWidthClass} ${
        !bgLight && variantClasses[variant]
      }`}
      // style={dynamicStyles[variant]}
      // whileHover={hoverStyles[variant]}
      // transition={{ duration: 0.220, ease: "easeIn" }}
    >
      {icon && React.cloneElement(icon, { size: 18 })}
      {label}
    </motion.button>
  );
};

export default Button;
