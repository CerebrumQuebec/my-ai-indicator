import React from "react";

interface Props {
  text: string;
}

const HighContrastText: React.FC<Props> = ({ text }) => {
  return <span className="text-gray-900 dark:text-white">{text}</span>;
};

export default HighContrastText;
