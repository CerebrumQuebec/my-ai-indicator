import React from "react";

interface HighContrastTextProps {
  children: React.ReactNode;
  className?: string;
}

const HighContrastText: React.FC<HighContrastTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`font-medium ${className}`}
      style={{
        color: "#ffffff",
        textShadow: "0 0 1px rgba(0,0,0,0.5)",
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
};

export default HighContrastText;
