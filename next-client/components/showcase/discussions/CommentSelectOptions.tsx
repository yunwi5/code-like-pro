import React from 'react';

import RoundButton from '../../ui/buttons/RoundButton';

// Select between 'All comments' and 'My comments' to provide simple filtering option to the user.
const CommentSelectOptions: React.FC<{
  showOnlyMyComments: boolean;
  setShowOnlyMyComments: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showOnlyMyComments, setShowOnlyMyComments }) => {
  return (
    // Selecting all comments or only user's comments
    <div className="flex gap-3">
      <RoundButton
        onClick={() => setShowOnlyMyComments(false)}
        className="!text-base"
        theme={!showOnlyMyComments ? 'dark' : 'light'}
      >
        All Comments
      </RoundButton>
      <RoundButton
        onClick={() => setShowOnlyMyComments(true)}
        className="!text-base"
        theme={showOnlyMyComments ? 'dark' : 'light'}
      >
        My Comments
      </RoundButton>
    </div>
  );
};

export default CommentSelectOptions;
