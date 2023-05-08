import React, { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

import BadgesInfoModal from './BadgesInfoModal';

const BadgesInfo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`translate-y-[2px] ${className}`}>
      {/* Badge info icon */}
      <BsQuestionCircle
        onClick={() => setShowModal(true)}
        className="text-2xl text-main-500 hover:scale-125 transition-all cursor-pointer"
      />

      {/* Badge info helper modal */}
      <BadgesInfoModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default BadgesInfo;
