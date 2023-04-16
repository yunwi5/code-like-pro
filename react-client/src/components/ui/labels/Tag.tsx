import React from 'react';
import { GrClose } from 'react-icons/gr';

interface Props {
    name: string;
    onDelete?: () => void;
    className?: string;
}

// Tag can optionally have onDelete prop.
// If the onDelete prop is defined, it shows 'x' mark for delete.
// Otherwise, it is read-only mode and 'x' mark is not shown.
const Tag: React.FC<Props> = ({ name, onDelete, className }) => {
    return (
        <div
            className={`text-[0.85rem] w-fit flex-center gap-1 px-2 py-1 bg-gray-200/90 border-2 hover:bg-gray-600/90 hover:text-white rounded-full shadow hover:shadow-md ${
                className ?? ''
            }`}
        >
            {name}
            {onDelete && (
                <button
                    className={
                        'flex-center ml-1 w-7 h-7 rounded-full border-2 border-gray-200 hover:border-none bg-gray-100 hover:bg-gray-400'
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
