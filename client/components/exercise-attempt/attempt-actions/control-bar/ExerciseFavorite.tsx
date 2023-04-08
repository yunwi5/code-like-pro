import { FC } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import HoveringLabel from '../../../ui/tooltip/HoveringLabel';

type Props = {
  onToggleLike: () => void;
  liked: boolean;
};

const ExerciseFavorite: FC<Props> = ({ liked, onToggleLike }) => {
  return (
    <HoveringLabel
      className="ml-auto z-50"
      label={<span className="!text-sm hover:text-yellow-300">Favorite</span>}
    >
      <div
        onClick={onToggleLike}
        className="icon-box ml-auto w-[2rem] h-[2rem] border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-yellow-50"
      >
        {liked ? <AiFillStar /> : <AiOutlineStar />}
      </div>
    </HoveringLabel>
  );
};

export default ExerciseFavorite;
