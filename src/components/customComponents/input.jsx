import React from "react";

const Input = ({
  id,
  type = "text",
  placeholder,
  autoCapitalize = "none",
  autoComplete = "off",
  autoCorrect = "off",
  disabled = false,
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default Input;
