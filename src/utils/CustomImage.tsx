'use client'
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import NoImg from '@/assets/No_image_available.png';

interface CustomImageProps extends ImageProps {
  alt: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, className, ...props }) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = !src ? NoImg : imageError ? NoImg : src;

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) setImageError(true);
      }}
      onLoadCapture={() => setImageError(false)}
      onError={() => setImageError(true)}
      loading="lazy"
      className={className}
      placeholder="empty"
    />
  );
};

export default CustomImage;
