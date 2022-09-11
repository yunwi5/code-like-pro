import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import CategoricalChart from '../../../ui/charts/CategoricalChart';
import ProportionMessages from './ProportionMessages';

const DifficultyAnalysis: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { analyzer } = useAnalysisContext();

    const difficultyChartDataArray: IChartData[] = useMemo(
        () => analyzer?.getDifficultyProportion() || [],
        [analyzer],
    );

    return (
        <section className={className}>
            <h3 className="text-2xl mb-6 sm:mb-2">Difficulty Analytics</h3>
            <div className="flex justify-between sm:items-center flex-col sm:flex-row max-w-[80%] sm:max-w-none">
                <ProportionMessages
                    dataArray={difficultyChartDataArray}
                    total={analyzer?.submissions.length || 0}
                />
                <CategoricalChart chartType="pie" dataArray={difficultyChartDataArray} />
            </div>
        </section>
    );
};

export default DifficultyAnalysis;
