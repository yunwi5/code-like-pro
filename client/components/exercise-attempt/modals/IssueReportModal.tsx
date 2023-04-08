import React, { useState } from 'react';
import { FaBug } from 'react-icons/fa';

import useExerciseReportsMutation from '../../../hooks/exercise/exercise-reports/useExerciseReportsMutation';
import CustomSelect from '../../ui/inputs/CustomSelect';
import CustomTextArea from '../../ui/inputs/CustomTextArea';
import { useExerciseAttemptCtx } from '../../../store/context/ExerciseAttemptContext';
import FormModal from '../../ui/modals/variations/FormModal';

const IssueCategories = [
  'Bugs In General',
  'Incorrect Difficulty',
  'Incorrect Topic',
  'Bugs In Test Cases',
  'Correct Algorithm Does Not Work',
  'Lack Of Information',
  'Misleading Prompt',
  'Others',
];

const DEFAULT_CATEGORY = 'Bugs In General';

const IssueReportModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const { exercise } = useExerciseAttemptCtx();
  const { postReport } = useExerciseReportsMutation(exercise?._id);

  const [issueCategory, setIssueCategory] = useState(DEFAULT_CATEGORY); // Incorrect Difficulty by default
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
    const postError = await postReport({
      category: issueCategory,
      description,
    });
    setIsLoading(false);

    if (!postError) {
      onClose();
      setIssueCategory(DEFAULT_CATEGORY);
      setDescription('');
    } else {
      setError(postError);
    }
  };

  return (
    <FormModal
      open={visible}
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
