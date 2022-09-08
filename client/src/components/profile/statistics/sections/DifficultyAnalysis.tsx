import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { round } from '../../../../utils/calculation';
import ProportionChart from '../../../ui/charts/ProportionChart';
import ProfileLoader from '../../ProfileLoader';
import ProportionMessages from './ProportionMessages';

const DifficultyAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    if (analyzer == null) return <ProfileLoader />;

    const difficultyChartDataArray: IChartData[] = useMemo(
        () => analyzer.getDifficultyProportion(),
        [analyzer],
    );

    return (
        <section>
            <h2 className="text-2xl basis-full">Difficulty Analytics</h2>
            <div className="flex-between gap-x-6">
                <ProportionMessages
                    dataArray={difficultyChartDataArray}
                    total={analyzer.submissions.length}
                />
                <ProportionChart
                    chartType="pie"
                    dataArray={difficultyChartDataArray}
                    width="300px"
                    height="300px"
                />
            </div>
        </section>
    );
};

const DifficultyAnalysisMessage: React.FC<{ dataArray: IChartData[]; total: number }> = ({
    dataArray,
    total,
}) => {
    return (
        <div className="flex flex-col gap-2">
            {dataArray.map((data) => (
                <div className="flex-start gap-2">
                    <h5 className="font-semibold text-gray-600">{data.label}:</h5>
                    <p>{round((data.value / total) * 100).toFixed(1)}%</p>
                </div>
            ))}
        </div>
    );
};

export default DifficultyAnalysis;
