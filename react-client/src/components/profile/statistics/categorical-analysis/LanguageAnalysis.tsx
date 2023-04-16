import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { useUserContext } from '../../../../store/context/UserContext';
import { getDateFormat } from '../../../../utils/datetime';
import { prettierLanguageName } from '../../../../utils/language';
import { getMostRecentSubmission } from '../../../../utils/user-submission';
import CategoricalChart from '../../../ui/charts/CategoricalChart';
import LanguageLabel from '../../../ui/labels/LanguageLabel';

const LanguageAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    const languageDataArray: IChartData[] = useMemo(
        () => analyzer?.getLanguageProportion() || [],
        [analyzer],
    );

    return (
        <section className="pl-3 md:pl-0">
            <h2 className="mt-4 lg:-mb-[2.5rem] text-2xl">Language Analytics</h2>
            <div className="flex justify-between sm:items-center flex-col sm:flex-row">
                {languageDataArray.length > 0 && (
                    <LanguageAnalyticMessages
                        className="order-2 sm:order-none"
                        dataArray={languageDataArray}
                    />
                )}
                <CategoricalChart
                    dataArray={languageDataArray.map((data) => ({
                        ...data,
                        label: prettierLanguageName(data.label),
                    }))}
                    legendPosition="right"
                />
            </div>
        </section>
    );
};

interface AnalyticsProps {
    dataArray: IChartData[];
    className?: string;
}

const LanguageAnalyticMessages: React.FC<AnalyticsProps> = ({
    dataArray,
    className = '',
}) => {
    const { userDetail } = useUserContext();
    const mostRecentSubmission = getMostRecentSubmission(userDetail?.submissions || []);

    const mostUsed = dataArray.reduce(
        (accMaxData, currData) =>
            currData.value > (accMaxData?.value ?? 0) ? currData : accMaxData,
        dataArray.length > 0 ? dataArray[0] : null,
    );

    const usedLanguages = dataArray.map((data) => data.label).sort();

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div className="flex-start gap-2 text-base">
                <h5 className="font-semibold">Total Languages Trained:</h5>
                <p>{dataArray.length} Languages</p>
            </div>
            {dataArray.length > 0 && (
                <div className="flex-start flex-wrap gap-2 text-base">
                    <h5 className="font-semibold">Languages:</h5>
                    {usedLanguages.map((lang) => (
                        <LanguageLabel key={lang} language={lang as any} />
                    ))}
                </div>
            )}
            {mostUsed && (
                <div className="flex-start gap-2">
                    <h5 className="font-semibold">Most Trained Language:</h5>
                    <p>
                        {prettierLanguageName(mostUsed.label)} &nbsp;
                        <span className="font-semibold text-gray-500 text-[0.95rem]">
                            ({mostUsed.value} times)
                        </span>
                    </p>
                </div>
            )}
            {mostRecentSubmission && (
                <div className="flex-start gap-2">
                    <h5 className="font-semibold">Most Recent:</h5>
                    <p>
                        {prettierLanguageName(
                            mostRecentSubmission.exercise.language as any,
                        )}
                        &ensp;
                        <span className="font-semibold text-gray-500 text-[0.95rem]">
                            ({getDateFormat(mostRecentSubmission.postedAt)})
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default LanguageAnalysis;
