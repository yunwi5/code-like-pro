import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import useForceRerender from '../../../hooks/useForceRerender';
import Image from 'next/image';

interface Props {
  picture: string | undefined;
  alt?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
}

// Displays profile picture of the user.
// If the user has a picture link to display, show the picture in the circle.
// If the user has no picture, show some placeholder user icon in the circle.
const ProfilePicture: React.FC<Props> = ({
  size = '2rem',
  alt,
  picture,
  className = '',
  onClick,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageValid, setImageValid] = useState(true);
  // Force the component to re-render once more after 1s, to force the image loading.
  // Image loading takes time, so it is better to force re-render after 1s to ensure the image is eventually loaded.
  useForceRerender(1000);

  // Prevent showing broken image
  useEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;
    // Check if the image is loaded successfully
    const isValid = image.naturalHeight === 0;

    if (isValid) {
      // Hide the image if the image load is invalid
      setImageValid(false);
    } else {
      setImageValid(true);
    }
  }, [imageRef.current?.complete, imageRef.current?.naturalHeight]);

  return (
    <div
      onClick={onClick}
      className={`flex-center shrink-0 overflow-hidden rounded-full shadow bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <FaUser className="text-gray-600 scale-90 translate-y-1" size={size} />
      {picture && alt && (
        <Image
          ref={imageRef}
          src={picture}
          alt={alt}
          className={`min-w-full min-h-full object-cover ${imageValid ? '' : 'hidden'}`}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
