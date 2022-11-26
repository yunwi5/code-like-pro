import React, { useState } from 'react';
import { BsBarChartFill } from 'react-icons/bs';
import { useExerciseAttemptCtx } from '../../../../../store/context/ExerciseAttemptContext';
import TextEditor from '../../../../ui/editor/text-editor/TextEditor';
import TagList from '../../../../ui/lists/TagList';
import DifficultyModal from '../../../modals/difficulty-modal/DifficultyModal';
import ExercisePromptHeader from './ExercisePromptHeader';

const ExercisePrompt: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();

    return (
        <section
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="flex-1 flex flex-col gap-8 overflow-y-scroll px-5 py-4 bg-white"
        >
            <ExercisePromptHeader />
            <TextEditor
                className="read-only-editor"
                value={exercise?.prompt || ''}
                readOnly={true}
                placeholder={'Write something awesome...'}
            />

            {/* Display exercise relevant tags */}
            <footer className="-mt-3 flex flex-col gap-3">
                <TagList title="" tags={exercise?.tags || []} />
                <DifficultyPrompt />
            </footer>
        </section>
    );
};

const DifficultyPrompt: React.FC = () => {
    const [showDifficultyModal, setShowDifficultyModal] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <BsBarChartFill className="text-slate-600" />
                {/* <p className="mr-auto">How difficult is the challenge?</p> */}

                <button
                    onClick={() => setShowDifficultyModal(true)}
                    className="px-3 py-[0.3rem] rounded-full shadow-md bg-gray-200 hover:bg-main-400 hover:text-white transition-all"
                >
                    Rate Difficulty
                </button>
            </div>

            <DifficultyModal
                open={showDifficultyModal}
                onClose={() => setShowDifficultyModal(false)}
            />
        </>
    );
};

export default ExercisePrompt;
