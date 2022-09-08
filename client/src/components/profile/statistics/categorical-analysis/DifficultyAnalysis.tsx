import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { round } from '../../../../utils/calculation';
import CategoricalChart from '../../../ui/charts/CategoricalChart';
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
                <CategoricalChart
                    chartType="pie"
                    dataArray={difficultyChartDataArray}
                    width="300px"
                    height="300px"
                />
            </div>
        </section>
    );
};

export default DifficultyAnalysis;
