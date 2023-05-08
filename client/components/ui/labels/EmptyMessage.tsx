import React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';

type Props = { message: string; className?: string };

// eslint-disable-next-line react/display-name
const EmptyMessage: React.FC<Props> = React.memo(({ message, className = '' }) => (
  <h5 className={`flex-center gap-2 mt-12 text-xl capitalize font-semibold ${className}`}>
    {message} <RiEmotionSadLine className="text-main-400 text-[1.35em]" />
  </h5>
));

export default EmptyMessage;
