import { StaticImageData } from 'next/image';

import Avatar1 from './avatar1.png';
import Avatar2 from './avatar2.png';
import Avatar4 from './avatar4.png';
import Avatar5 from './avatar5.png';
import Avatar6 from './avatar6.png';
import Avatar7 from './avatar7.png';
import Avatar8 from './avatar8.png';
import Avatar9 from './avatar9.png';
import Avatar10 from './avatar10.png';
import Avatar11 from './avatar11.png';
import Avatar12 from './avatar12.png';
import Default from './default.jpg';

export const DefaultProfile = Default;

export const AvatarImageById: { [key: string]: StaticImageData } = {
  Avatar1,
  Avatar2,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
};

export const AvatarImagesList = Object.values(AvatarImageById).map((image) => image.src);
