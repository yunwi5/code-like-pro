import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import CategoricalChart from '../../../ui/charts/CategoricalChart';
import ProportionMessages from './ProportionMessages';

const DifficultyAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    const difficultyChartDataArray: IChartData[] = useMemo(
        () => analyzer?.getDifficultyProportion() || [],
        [analyzer],
    );

    return (
        <section>
            <h3 className="text-2xl basis-full">Difficulty Analytics</h3>
            <div className="flex-between gap-x-6">
                <ProportionMessages
                    dataArray={difficultyChartDataArray}
                    total={analyzer?.submissions.length || 0}
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
