import { useState } from 'react';
import { GoAlert } from 'react-icons/go';

import HoveringLabel from '../../../ui/tooltip/HoveringLabel';
import IssueReportModal from '../../modals/IssueReportModal';

const ExerciseReportButton = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <>
      <HoveringLabel
        className="ml-2 z-50"
        onClick={() => setShowReportModal(true)}
        label={<span className="!text-sm hover:text-yellow-300">Report</span>}
      >
        <div className="icon-box w-[2rem] h-[2rem] border-main-500 text-main-400 hover:bg-main-400 hover:text-main-50">
          <GoAlert />
        </div>
      </HoveringLabel>
      <IssueReportModal visible={showReportModal} onClose={() => setShowReportModal(false)} />
    </>
  );
};

export default ExerciseReportButton;
