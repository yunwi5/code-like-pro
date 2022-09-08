import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { useUserContext } from '../../../../store/context/UserContext';
import { getDateFormat } from '../../../../utils/datetime';
import { getLanguageIcon, prettierLanguageName } from '../../../../utils/language';
import { getMostRecentSubmission } from '../../../../utils/user-submission';
import ProportionChart from '../../../ui/charts/ProportionChart';
import ProfileLoader from '../../ProfileLoader';

const LanguageAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    if (analyzer == null) return <ProfileLoader />;

    const languageDataArray: IChartData[] = useMemo(
        () => analyzer.getLanguageProportion(),
        [analyzer],
    );

    return (
        <section>
            <h2 className="lg:-mb-12 text-2xl basis-full">Language Analytics</h2>
            <div className="flex-between">
                <LanguageAnalyticMessages dataArray={languageDataArray} />
                <ProportionChart
                    dataArray={languageDataArray.map((data) => ({
                        ...data,
                        label: prettierLanguageName(data.label),
                    }))}
                    width="430px"
                    height="430px"
                    legendPosition="right"
                />
            </div>
        </section>
    );
};

interface AnalyticsProps {
    dataArray: IChartData[];
}

const LanguageAnalyticMessages: React.FC<AnalyticsProps> = ({ dataArray }) => {
    const { userDetail } = useUserContext();
    const mostRecentSubmission = getMostRecentSubmission(userDetail?.submissions || []);

    const mostUsed = dataArray.reduce(
        (accMaxData, currData) => (currData.value > accMaxData.value ? currData : accMaxData),
        dataArray[0],
    );

    return (
        <div className="flex flex-col gap-3">
            <div className="flex-start gap-2 text-base">
                <h5 className="font-semibold">Total Languages Trained:</h5>
                <p>{dataArray.length} Languages</p>
            </div>
            <div className="flex-start gap-2 text-base">
                <h5 className="font-semibold">Languages:</h5>
                {dataArray.map((data) => (
                    <div className="flex flex-col items-center ml-2">
                        <span className="text-sm">
                            {getLanguageIcon(data.label as any, {
                                width: '33px',
                                height: '33px',
                            })}
                        </span>
                        <span className="text-sm">
                            {prettierLanguageName(data.label as any)}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex-start gap-2">
                <h5 className="font-semibold">Most Trained Language:</h5>
                <p>
                    {prettierLanguageName(mostUsed.label)} &nbsp;
                    <span className="font-semibold text-gray-500 text-[0.95rem]">
                        ({mostUsed.value} times)
                    </span>
                </p>
            </div>
            {mostRecentSubmission && (
                <div className="flex-start gap-2">
                    <h5 className="font-semibold">Most Recent:</h5>
                    <p>
                        {prettierLanguageName(mostRecentSubmission.exercise.language as any)}
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
