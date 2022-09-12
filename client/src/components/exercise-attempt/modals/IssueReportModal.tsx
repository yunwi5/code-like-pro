import React, { useState } from 'react';
import { FaBug } from 'react-icons/fa';

import CustomSelect from '../../ui/inputs/CustomSelect';
import CustomTextArea from '../../ui/inputs/CustomTextArea';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import { reportExerciseRequest } from '../../../apis/exercise';
import { toastNotify } from '../../../utils/notification';
import FormModal from '../../ui/modals/variations/FormModal';

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
    const { exercise, refetchExercise } = useExerciseAttemptCtx();

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
        const { ok, data, message } = await reportExerciseRequest(exercise._id, {
            category: issueCategory,
            description,
        });
        refetchExercise();
        setIsLoading(false);
        if (ok) {
            console.log(data);
            toastNotify('Sending report successful!', 'success');
            onClose();
        } else {
            console.log(message);
            setError(message);
            toastNotify(message, 'error');
        }
    };

    return (
        <FormModal
            onClose={onClose}
            onSubmit={handleSubmit}
            heading={
                <>
                    <FaBug className="text-main-400" /> Issue Report
                </>
            }
            isLoading={isLoading}
            buttonText="Submit Issue"
        >
            <>
                <p className="-mt-2 -mb-2 flex-start flex-wrap gap-x-1 font-semibold text-slate-600">
                    Issue regarding the challenge{' '}
                    <strong className="text-main-400">{exercise?.name || 'Unkown'}</strong>.
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
            </>
        </FormModal>
    );
};

export default IssueReportModal;
