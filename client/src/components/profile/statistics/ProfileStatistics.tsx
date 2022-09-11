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
            <main className="flex flex-col gap-8 px-4 xl:px-6 py-8 w-[100%]">
                <h1 className="flex-start gap-2 text-3xl text-gray-600 font-normal">
                    <GiProgression className="text-main-400" />
                    Progress Analytics
                </h1>
                {/* User Language Stats */}
                <LanguageAnalysis />
                <div className="flex justify-between flex-col md:flex-row gap-y-8 lg:gap-x-5 xl:gap-x-12 mt-8 md:mt-0 pl-3 md:pl-0">
                    {/* User Exercise Attempt Difficulty Proportion */}
                    <DifficultyAnalysis className="md:basis-1/2" />
                    {/* User Exercise Attempt Submission Status */}
                    <SubmissionStatusAnalysis className="md:basis-1/2" />
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
