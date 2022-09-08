import React from 'react';
import { GiProgression } from 'react-icons/gi';

import { AnalysisContextProvider } from '../../../store/context/AnalysisContext';
import DifficultyAnalysis from './sections/DifficultyAnalysis';
import LanguageAnalysis from './sections/LanguageAnalysis';
import SubmissionStatusAnalysis from './sections/SubmissionStatusAnalysis';

const ProfileStatistics = () => {
    return (
        <AnalysisContextProvider>
            <main className="w-full px-4 xl:px-6 py-10">
                <div className="flex flex-col gap-8">
                    <h1 className="flex-start gap-2 text-3xl text-gray-600 font-normal">
                        <GiProgression className="text-main-400" />
                        Progress Analytics
                    </h1>
                    <LanguageAnalysis />
                    <div className="flex justify-between flex-col lg:flex-row">
                        <DifficultyAnalysis />
                        <SubmissionStatusAnalysis />
                    </div>
                    {/* Exercise topics comparisons */}
                </div>
            </main>
        </AnalysisContextProvider>
    );
};

export default ProfileStatistics;
