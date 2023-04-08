import { FC, useState } from 'react';
import { BsBarChartFill } from 'react-icons/bs';
import HoveringLabel from '../../../ui/tooltip/HoveringLabel';
import DifficultyModal from '../../modals/difficulty-modal/DifficultyModal';

const DifficultyRatingButton: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HoveringLabel
        className="ml-2 z-50"
        onClick={() => setShowModal(true)}
        label={<span className="!text-sm hover:text-yellow-300">Difficulty</span>}
      >
        <div className="icon-box w-[2rem] h-[2rem] border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-pink-50">
          <BsBarChartFill />
        </div>
      </HoveringLabel>

      <DifficultyModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default DifficultyRatingButton;
