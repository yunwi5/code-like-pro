import React from 'react';
import { BsFillFilterCircleFill } from 'react-icons/bs';
import { IExerciseCard } from '../../../models/interfaces';

interface Props {
    exercises: IExerciseCard[];
    onToggleSidebar: () => void; // sidebar toggling for mobile screens
}

const BrowsingHeader: React.FC<Props> = ({ exercises, onToggleSidebar }) => {
    return (
        <div className="mb-2 flex flex-col lg:flex-row items-between lg:items-center lg:justify-between">
            <h1 className="text-gray-500 font-semibold text-2xl">
                <span className="text-main-500">Browsing</span>{' '}
                <span className="text-purple-500">Challenges</span>
            </h1>
            <div className="flex justify-between items-center mt-2 -mb-1">
                <button
                    onClick={onToggleSidebar}
                    className={`lg:hidden flex-start gap-1 px-2 py-1 text-slate-600 hover:bg-gray-100 hover:text-main-500 rounded-sm cursor-pointer`}
                >
                    <BsFillFilterCircleFill className="text-main-500" /> Browsing
                </button>
                <h3 className="text-gray-500/90 font-semibold text-base sm:text-lg lg:translate-y-2">
                    {exercises.length} Challenges
                </h3>
            </div>
        </div>
    );
};

export default BrowsingHeader;
