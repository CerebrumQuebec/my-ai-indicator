import Image from 'next/image';
import { ComponentProps } from 'react';

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  ...props 
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={75}
      sizes={`${width}px`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain',
      }}
      {...props}
    />
  );
};

export default OptimizedImage;