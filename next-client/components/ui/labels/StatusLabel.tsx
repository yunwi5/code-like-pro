import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const StatusLabel: React.FC<{ correct: boolean; showIcon?: boolean }> = ({
  correct,
  showIcon = true,
}) => {
  const statusClass = correct ? 'text-emerald-500' : 'text-rose-500';

  return (
    <div className={`flex-start gap-2 ${statusClass}`}>
      {showIcon && (
        <div className="flex-center w-[1.65rem] h-[1.65rem] rounded-full shadow-md bg-white">
          {correct ? <FiCheck size={23} /> : <IoMdClose size={23} />}
        </div>
      )}
      {correct ? 'Success' : 'Fail'}
    </div>
  );
};

export default StatusLabel;
