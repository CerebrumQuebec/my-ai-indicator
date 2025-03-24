"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "default" | "sm" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  size = "default",
  type = "button",
  disabled = false,
  className = "",
  icon,
  fullWidth = false,
}) => {
  const sizeClasses = {
    sm: "h-9 px-6 text-xs",
    default:
      "min-h-10 px-6 py-2.5 text-sm whitespace-normal text-center flex-shrink-0",
    lg: "h-12 px-10 text-base",
  };

  const variantClasses = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:shadow-sm border border-primary-700/50",
    secondary:
      "bg-gray-700 text-white hover:bg-gray-600 shadow-md hover:shadow-lg active:shadow-sm border border-gray-600/50",
    outline:
      "bg-transparent border border-gray-600/70 text-gray-200 hover:bg-gray-800/30 shadow-sm hover:border-gray-500",
    gradient:
      "bg-gradient-to-r from-primary-600 to-accent-indigo text-white hover:from-primary-700 hover:to-accent-indigo/90 shadow-md hover:shadow-lg active:shadow-sm border border-primary-700/50",
  };

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
