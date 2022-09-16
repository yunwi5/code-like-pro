import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickAwayListener from 'react-click-away-listener';
import { AiTwotoneSetting } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { deleteExercise } from '../../../apis/exercise';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { getExerciseEditLink } from '../../../utils/links';
import { toastNotify } from '../../../utils/notification';
import DeleteModal from '../../ui/modals/variations/DeleteModal';

// Button on the editor page control bar, which is displayed only to the author of the exercis
// To trigger the edit and delete action of the exercise they created.
const ExerciseSettings: React.FC = () => {
    const navigate = useNavigate();
    const { exercise } = useExerciseAttemptCtx();

    // State for managing dropdown menu visibility.
    const [showDropdown, setShowDropdown] = useState(false);
    // State for poping up the delete modal for the delete action.
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!exercise) return null;

    const handleDeleteAction = () => {
        navigate('/browse');
        toastNotify(`Successfully delete exercise ${exercise.name}`);
    };

    return (
        <>
            <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                <div className="relative ml-2 -mr-2">
                    <button
                        onClick={() => setShowDropdown((ps) => !ps)}
                        className="flex-center w-[2rem] h-[2rem] bg-gray-500 hover:bg-gray-700 transition-all shadow-md rounded-sm"
                    >
                        <AiTwotoneSetting className="text-gray-50 text-xl" />
                    </button>

                    {/* Dropdown menu for edit and delete operations */}
                    {showDropdown && (
                        <div className="z-[300] flex flex-col min-w-[5rem] absolute top-[108%] right-0 bg-white border-2 border-gray-100 rounded-sm shadow-md hover:shadow-lg text-gray-700">
                            <Link
                                to={getExerciseEditLink(exercise?._id)}
                                className="flex-start gap-1 px-2 py-[0.375rem] hover:bg-main-400 hover:text-white cursor-pointer"
                            >
                                <MdOutlineEdit className=" text-xl" />
                                Edit
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="flex-start gap-1 px-2 py-[0.375rem] hover:bg-rose-500 hover:text-white cursor-pointer"
                            >
                                <RiDeleteBin6Line className="text-xl" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </ClickAwayListener>

            {/* Show delete warning modal if the user clicks the delete action */}
            {showDeleteModal && (
                <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    deleteFunction={deleteExercise.bind(null, exercise._id)}
                    onDelete={handleDeleteAction}
                    item={`Exercise ${exercise.name}`}
                />
            )}
        </>
    );
};

export default ExerciseSettings;
