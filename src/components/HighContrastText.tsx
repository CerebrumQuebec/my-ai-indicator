import React from "react";

interface HighContrastTextProps {
  text: string;
  className?: string;
}

const HighContrastText: React.FC<HighContrastTextProps> = ({
  text,
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
      {text}
    </div>
  );
};

export default HighContrastText;
