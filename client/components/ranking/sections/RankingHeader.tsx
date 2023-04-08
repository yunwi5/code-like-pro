import React from 'react';
import { useTopicParam } from '@/hooks/utils/useTopicParam';

// If the label is too long, reduce its font size depending on its length.
function getHeadingLabelSize(label: string) {
  if (label.length < 8) return 'text-[2.5rem] -mb-2';
  if (label.length < 12) return 'text-4xl';
  return 'text-3xl';
}

const RankingHeader: React.FC<{ className?: string }> = ({ className = '' }) => {
  const headingLabel = useTopicParam() || 'Global';

  return (
    <header className={`flex flex-col items-end h-[6.3rem] ${className}`}>
      <div className={`${getHeadingLabelSize(headingLabel)}  text-right text-gray-500`}>
        {headingLabel}
      </div>
      <div className="text-main-400 text-lg font-bold text-right">Rankings</div>
    </header>
  );
};

export default RankingHeader;
