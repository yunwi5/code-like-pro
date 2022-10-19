import React, { useMemo } from 'react';
import { FaSmile } from 'react-icons/fa';

import useExerciseReportsQuery from '../../../../hooks/exercise-queries/useExerciseReportsQuery';
import ClipLoader from 'react-spinners/ClipLoader';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { compareByVotes } from '../../../../utils/sorting-utils';
import IssueReportList from '../../../ui/lists/IssueReportList';
import { GoIssueClosed } from 'react-icons/go';

const ExerciseIssueReports: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();
    if (exercise == null) return null;

    const { reports, isLoading } = useExerciseReportsQuery(exercise._id);

    // Sort the reports by votes descending always.
    const sortedReports = useMemo(() => {
        return reports.sort((a, b) => compareByVotes(b.votes, a.votes));
    }, [reports]);

    return (
        <section className="flex-1 flex flex-col gap-3 px-4 py-5 overflow-y-scroll bg-white">
            <div className="flex flex-wrap justify-between items-center">
                <h2 className="flex-start gap-1 text-gray-600 text-xl capitalize">
                    <GoIssueClosed /> Be aware of these issues!
                </h2>
                <p className="text-gray-600/90 font-semibold">{reports.length} Issues</p>
            </div>
            {isLoading && (
                <div className="flex-center py-10">
                    <ClipLoader size={80} color="#5552e4" />
                </div>
            )}
            {!isLoading && sortedReports.length === 0 && <NoReportsMessage />}
            {sortedReports && (
                <IssueReportList reports={sortedReports} reportsPerPage={5} />
            )}
        </section>
    );
};

// Message to be displayed if there are no issue reports
const NoReportsMessage = React.memo(() => (
    <div className="h-[20rem] flex-center gap-2 text-lg">
        <FaSmile className="text-main-500 text-xl" />
        <h3 className="text-slate-600">Fortunately, there are no issues!</h3>
    </div>
));

export default ExerciseIssueReports;
