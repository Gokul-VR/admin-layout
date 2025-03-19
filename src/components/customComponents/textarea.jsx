import React from "react";

const Textarea = ({
  id,
  placeholder,
  autoCapitalize = "none",
  autoComplete = "off",
  autoCorrect = "off",
  disabled = false,
  value,
  onChange,
  className = "",
  rows = 4,
  ...props
}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      disabled={disabled}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default Textarea;
