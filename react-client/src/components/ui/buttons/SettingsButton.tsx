import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { AiTwotoneSetting } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface Props {
    className?: string;
    onEdit: () => void; // On trigger edit action
    onDelete: () => void; // On trigger delete action
}

// Setting gear icon for editing and deleting actions.
const SettingsButton: React.FC<Props> = ({ onEdit, onDelete, className = '' }) => {
    // State for managing dropdown menu visibility.
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setShowDropdown((ps) => !ps)}
                    className="flex-center w-[2rem] h-[2rem] bg-gray-500 hover:bg-gray-700 transition-all shadow-md rounded-sm"
                >
                    <AiTwotoneSetting className="text-gray-50 text-xl" />
                </button>

                {/* Dropdown menu for edit and delete operations */}
                {showDropdown && (
                    <div className="z-[80] flex flex-col min-w-[5rem] absolute top-[108%] right-0 bg-white border-2 border-gray-100 rounded-sm shadow-md hover:shadow-lg text-gray-700">
                        <button
                            onClick={onEdit}
                            className="flex-start gap-1 px-2 py-[0.375rem] hover:bg-main-400 hover:text-white cursor-pointer"
                        >
                            <MdOutlineEdit className=" text-xl" />
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="flex-start gap-1 px-2 py-[0.375rem] hover:bg-rose-500 hover:text-white cursor-pointer"
                        >
                            <RiDeleteBin6Line className="text-xl" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default SettingsButton;
