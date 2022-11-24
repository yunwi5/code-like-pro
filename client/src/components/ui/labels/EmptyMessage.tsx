import React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';

type Props = { message: string };

const EmptyMessage: React.FC<Props> = React.memo(({ message }) => (
    <h5 className="flex-center gap-2 mt-12 text-xl capitalize font-semibold">
        {message} <RiEmotionSadLine className="text-main-400 text-[1.35em]" />
    </h5>
));

export default EmptyMessage;
