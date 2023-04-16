import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
    return (
        <button
            onClick={onDelete}
            className="px-1 py-1 transition-all rounded-md text-rose-500 hover:bg-rose-500 hover:text-white"
        >
            <RiDeleteBin6Line className="text-2xl" />
        </button>
    );
};

export default DeleteButton;
