import React from 'react';
import Image from 'next/image';

import { BadgeRarity } from '../../../../models/enums';
import { BadgeImageMap, BadgeRarityFullNames } from '../../../../utils/badge.util';

import './BadgeSpecCard.scss';

interface Props {
  rarity: BadgeRarity;
  description: string;
}

const BadgeSpecCard: React.FC<Props> = ({ rarity, description }) => {
  return (
    <article
      className={`${`${rarity.toLowerCase()}-spec`} badge-spec flex flex-col items-center px-2 py-2 gap-3 transition-all rounded`}
    >
      <div className="shrink-0">
        <Image
          src={BadgeImageMap[rarity]}
          alt={`Badge ${rarity}`}
          className="object-cover lg:h-[8rem] lg:w-[10rem] max-h-[15rem] max-w-[11rem]"
        />
      </div>
      <h3 className="text-xl">
        <span className="short-name text-[1.3em]">{rarity}</span>&ensp;
        <span className="full-name">{BadgeRarityFullNames[rarity]}</span>
      </h3>
      <p className="-mt-1 text-center text-gray-600">{description}</p>
    </article>
  );
};

export default BadgeSpecCard;
