import React from "react";

interface Props {
  text: string;
}

const HighContrastText: React.FC<Props> = ({ text }) => {
  return <span className="text-white">{text}</span>;
};

export default HighContrastText;
