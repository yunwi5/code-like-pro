import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';

const EditButton: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
    return (
        <button
            onClick={onEdit}
            className="px-1 py-1 transition-all rounded-md text-sky-500 hover:bg-sky-500 hover:text-white"
        >
            <MdOutlineEdit className=" text-2xl" />
        </button>
    );
};

export default EditButton;
