import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteExercise } from '../../../../apis/exercise.api';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { getExerciseEditLink } from '../../../../utils/links.util';
import { toastNotify } from '../../../../utils/notification.util';
import DeleteModal from '../../../ui/modals/variations/DeleteModal';
import SettingsButton from '../../../ui/buttons/SettingsButton';

// Button on the editor page control bar, which is displayed only to the author of the exercis
// To trigger the edit and delete action of the exercise they created.
const ExerciseSettings: React.FC = () => {
  const navigate = useNavigate();
  const { exercise } = useExerciseAttemptCtx();

  // State for poping up the delete modal for the delete action.
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!exercise) return null;

  const handleDeleteAction = () => {
    navigate('/browse');
    toastNotify(`Successfully delete exercise ${exercise.name}`);
  };

  return (
    <>
      <SettingsButton
        onEdit={() => navigate(getExerciseEditLink(exercise?._id))}
        onDelete={() => setShowDeleteModal(true)}
        className="ml-2 -mr-2"
      />

      {/* Show delete warning modal if the user clicks the delete action */}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        deleteFunction={deleteExercise.bind(null, exercise._id)}
        onDelete={handleDeleteAction}
        item={`Exercise ${exercise.name}`}
      />
    </>
  );
};

export default ExerciseSettings;
