import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

import { IBadge } from '../../../../models/interfaces';
import { BadgeImageMap } from '../../../../utils/badge.util';
import { getDateFormat } from '../../../../utils/datetime.util';
import HoveringLabel from '../../tooltip/HoveringLabel';

interface Props {
  badge: IBadge;
  onClose: () => void;
}

const BadgeDetail: React.FC<Props> = ({ badge, onClose }) => {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className="!z-[2000] w-full h-full max-h-[30rem] relative grid grid-cols-7 grid-rows-6 bg-gray-100 text-gray-600 border-[3.5px] border-main-400 rounded-sm">
        <div className="relative overflow-hidden col-span-7 row-span-3 flex-center border-b-[3px] border-main-300">
          <Image
            className="-translate-y-[3%] object-cover"
            style={{ scale: 0.72 }}
            src={BadgeImageMap[badge.rarity]}
            alt={badge.name}
          />
        </div>
        <div className="col-span-2 row-span-3 flex-center border-r-[3px] border-main-300">
          <HoveringLabel label={'Ultimate Rare!'}>
            <strong className="text-main-500 text-[4.5rem] leading-[4rem]">{badge.rarity}</strong>
          </HoveringLabel>
        </div>
        <div className="col-span-5 px-2 py-[0.35rem] flex-center text-xl text-main-500 font-semibold border-b-[3px] border-main-300">
          {badge.name}
        </div>
        <div className="flex flex-col col-span-5 row-span-2 px-2 py-[0.35rem] font-semibold">
          <p>
            <span>About this badge:</span> <br />
            {badge.description}
          </p>
          <time className="mt-auto self-end font-semibold">
            Awarded At: <span className="font-bold">{getDateFormat(badge.awardedAt)}</span>
          </time>
        </div>

        {/* Close button */}
        <div
          onClick={onClose}
          className="absolute top-3 right-3 w-[1.8rem] h-[1.8rem] flex-center rounded-full bg-main-100/80 hover:bg-main-100 cursor-pointer"
        >
          <AiOutlineClose className="text-main-500 text-xl" />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default BadgeDetail;
