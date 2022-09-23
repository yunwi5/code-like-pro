import React, { useMemo } from 'react';
import { FaSmile } from 'react-icons/fa';

import useExerciseReportsQuery from '../../../../hooks/queries/useExerciseReportsQuery';
import ClipLoader from 'react-spinners/ClipLoader';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { compareByVotes } from '../../../../utils/sorting-utils';
import IssueReportList from '../../../ui/lists/IssueReportList';

const ExerciseIssueReports: React.FC = () => {
    const { exercise } = useExerciseAttemptCtx();
    if (exercise == null) return null;

    const { reports, isLoading } = useExerciseReportsQuery(exercise._id);

    // Sort the reports by votes descending always.
    const sortedReports = useMemo(() => {
        return reports.sort((a, b) => compareByVotes(b.votes, a.votes));
    }, [reports]);

    return (
        <section className="flex-1 flex flex-col gap-4 px-4 py-5 overflow-y-scroll bg-white">
            <div className="flex flex-wrap justify-between items-center">
                <h2 className="text-main-600 text-xl capitalize">Be aware of these issues!</h2>
                <p className="text-gray-600/90 font-semibold">{reports.length} Issues</p>
            </div>
            {isLoading && (
                <div className="flex-center py-10">
                    <ClipLoader size={50} color="#5552e4" />
                </div>
            )}
            {sortedReports.length === 0 && (
                <div className="mt-12 flex-center gap-2 text-lg">
                    <FaSmile className="text-main-500 text-xl" />
                    <h3 className="text-slate-600">Fortunately, there are no issues!</h3>
                </div>
            )}
            {sortedReports && <IssueReportList reports={sortedReports} reportsPerPage={5} />}
        </section>
    );
};

export default ExerciseIssueReports;
