import React from 'react';
import { GrClose } from 'react-icons/gr';

interface Props {
    name: string;
    onDelete?: () => void;
    className?: string;
}

const Tag: React.FC<Props> = ({ name, onDelete, className }) => {
    return (
        <div
            className={`text-[0.9rem] w-fit flex-center gap-1 px-2 py-1 bg-gray-100 border-2 border-gray-300 hover:bg-gray-600/90 hover:text-gray-50 hover:shadow-md rounded-full ${
                className ?? ''
            }`}
        >
            <span className="text-base font-semibold">#</span>
            {name}
            {onDelete && (
                <button
                    className={
                        'flex-center ml-1 w-7 h-7 rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-gray-400'
                    }
                    onClick={onDelete}
                >
                    <GrClose />
                </button>
            )}
        </div>
    );
};

export default Tag;
