import React, { useEffect, useMemo, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

import { getUserPictureUrl } from '@/utils/image.util';

interface Props {
  picture: string | undefined; // either external picture URL or avatar ID
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
  const [imageValid, setImageValid] = useState(true);

  useEffect(() => {
    if (!picture?.trim()) setImageValid(false);
  }, [picture]);

  console.log('picture:', picture);
  const pictureUrl = useMemo(() => getUserPictureUrl(picture), [picture]);

  return (
    <div
      onClick={onClick}
      className={`relative flex-center shrink-0 overflow-hidden rounded-full bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <FaUser
        style={{ display: imageValid ? 'none' : 'inline-block' }}
        className="text-gray-600 scale-90 translate-y-1"
        size={size}
      />
      {pictureUrl && (
        <Image
          fill
          src={pictureUrl}
          alt={alt ?? 'User profile picture'}
          className={'object-cover'}
          style={{ display: imageValid ? 'inline-block' : 'none' }}
          onError={() => setImageValid(false)}
          onWaiting={() => setImageValid(false)}
          onLoad={() => setImageValid(true)}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
