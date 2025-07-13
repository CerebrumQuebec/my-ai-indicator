import React from 'react';

interface SpriteIconProps {
  id: 'badge-0' | 'badge-1' | 'badge-2' | 'badge-3' | 'badge-4' | 'sounds-icon' | 'visual-icon' | 'text-icon';
  className?: string;
  width?: number;
  height?: number;
}

const SpriteIcon: React.FC<SpriteIconProps> = ({ 
  id, 
  className = '', 
  width = 24, 
  height = 24 
}) => {
  return (
    <svg 
      className={className} 
      width={width} 
      height={height}
      role="img"
      aria-label={`${id} icon`}
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default SpriteIcon;