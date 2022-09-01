import React, { useState } from 'react';
import { FaBug } from 'react-icons/fa';

import Modal from '../../ui/modals/Modal';
import CustomSelect from '../../ui/inputs/CustomSelect';
import CustomTextArea from '../../ui/inputs/CustomTextArea';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { reportExercise } from '../../../apis/exercise';
import { toastNotify } from '../../../utils/notification/toast';
import { ToastType } from '../../../models/enums';
import { ClipLoader } from 'react-spinners';

const IssueCategories = [
    'Incorrect Difficulty',
    'Incorrect Topic',
    'Bugs In Test Cases',
    'Correct Algorithm Does Not Work',
    'Lack Of Information',
    'Misleading Prompt',
    'Others',
];

const IssueReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { exercise } = useExerciseAttemptCtx();

    const [issueCategory, setIssueCategory] = useState('Incorrect Difficulty'); // Incorrect Difficulty by default
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!exercise) return;
        if (description.trim().length < 5) {
            return setError('Please write description of at least 5 characters');
        }

        setIsLoading(true);
        const { ok, data, message } = await reportExercise(exercise._id, {
            category: issueCategory,
            description,
        });
        setIsLoading(false);
        if (ok) {
            console.log(data);
            setDescription('');
            toastNotify('Sending report successful!', ToastType.SUCCESS);
        } else {
            console.log(message);
            setError(message);
            toastNotify(message, ToastType.ERROR);
        }
    };

    return (
        <Modal onClose={onClose} className="!rounded-md min-w-[37.5rem] overflow-hidden">
            <form className="text-gray-700" onSubmit={handleSubmit}>
                {/* Issue report header */}
                <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
                    <h2 className="text-2xl flex-start gap-2">
                        <FaBug className="text-main-400" /> Issue Report
                    </h2>
                </header>

                {/* Issue report body */}
                <div className="flex flex-col gap-5 bg-slate-200/90 px-7 py-5">
                    <p className="-mt-2 -mb-2 flex-start gap-1 font-semibold text-slate-600">
                        Issue regarding the challenge{' '}
                        <strong className="text-main-400">{exercise?.name || 'Unkown'}</strong>
                        .
                    </p>

                    {/* Issue category select */}
                    <CustomSelect
                        onChange={(val) => setIssueCategory(val)}
                        options={IssueCategories}
                        labelText={'Issue Category:'}
                        value={issueCategory}
                        id="issue-category"
                    />

                    {/* Issue Description */}
                    <CustomTextArea
                        labelText="description"
                        value={description}
                        onChange={(val) => setDescription(val)}
                        error={error}
                    />

                    {/* Action buttons for submission and closing modal */}
                    <div className="pt-2 flex-between">
                        {isLoading && <ClipLoader color="#3c38e0" size={40} />}
                        {!isLoading && (
                            <>
                                <button
                                    className={
                                        'px-3 py-2 text-lg rounded-sm bg-gray-700 hover:bg-gray-800 text-white shadow-md'
                                    }
                                >
                                    Submit Issue
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-2 text-lg rounded-sm bg-white hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default IssueReportModal;
