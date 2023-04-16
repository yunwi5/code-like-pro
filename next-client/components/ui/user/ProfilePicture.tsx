import React, { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

interface Props {
  picture: string | undefined;
  alt?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
}

const ProfilePicture: React.FC<Props> = ({
  size = '2rem',
  alt,
  picture,
  className = '',
  onClick,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageValid, setImageValid] = useState(true);

  return (
    <div
      onClick={onClick}
      className={`relative flex-center shrink-0 overflow-hidden rounded-full shadow bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <FaUser className="text-gray-600 scale-90 translate-y-1" size={size} />
      {picture && imageValid && (
        <Image
          ref={imageRef}
          fill
          src={picture}
          alt={alt ?? 'User profile picture'}
          className={'object-cover'}
          onError={() => setImageValid(false)}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
