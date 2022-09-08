import { GiProgression } from 'react-icons/gi';

import { AnalysisContextProvider } from '../../../store/context/AnalysisContext';
import DifficultyAnalysis from './categorical-analysis/DifficultyAnalysis';
import LanguageAnalysis from './categorical-analysis/LanguageAnalysis';
import SubmissionStatusAnalysis from './categorical-analysis/SubmissionStatusAnalysis';
import TopicAnalysis from './categorical-analysis/TopicAnalysis';
import TrendAnalysis from './trend-analysis/TrendAnalysis';

const ProfileStatistics = () => {
    return (
        <AnalysisContextProvider>
            <main className="flex flex-col gap-8 w-full px-4 xl:px-6 py-8">
                <h1 className="flex-start gap-2 text-3xl text-gray-600 font-normal">
                    <GiProgression className="text-main-400" />
                    Progress Analytics
                </h1>
                {/* User Language Stats */}
                <LanguageAnalysis />
                <div className="flex justify-between flex-col lg:flex-row">
                    {/* User Exercise Attempt Difficulty Proportion */}
                    <DifficultyAnalysis />
                    {/* User Exercise Attempt Submission Status */}
                    <SubmissionStatusAnalysis />
                </div>
                {/* Exercise topics comparisons */}
                <TopicAnalysis />

                {/* Trend analysis of user exercise creations and attempts */}
                <TrendAnalysis />
            </main>
        </AnalysisContextProvider>
    );
};

export default ProfileStatistics;
