import React from 'react';
import Image from 'next/image';

import { IBadge } from '../../../../models/interfaces';
import { BadgeImageMap } from '../../../../utils/badge.util';

// Toast badge reward component
// Notification badge
const BadgeNotification: React.FC<{ badge: IBadge }> = ({ badge }) => {
  const val = BadgeImageMap[badge.rarity];
  return (
    <div className="flex items-center gap-2">
      <div>
        <Image
          className="h-[9rem] max-w-[15rem] object-cover"
          src={BadgeImageMap[badge.rarity]}
          alt={`Badge ${badge.name}`}
        />
      </div>
      <h3>
        Badge <strong className="text-blue-200">{badge.name}</strong> Awarded!
      </h3>
    </div>
  );
};

export default BadgeNotification;
