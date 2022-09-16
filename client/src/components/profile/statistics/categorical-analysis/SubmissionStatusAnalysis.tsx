import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import CategoricalChart from '../../../ui/charts/CategoricalChart';
import ProportionMessages from './ProportionMessages';

const SubmissionStatusAnalysis: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { analyzer } = useAnalysisContext();

    const statusDataArray: IChartData[] = useMemo(
        () => analyzer?.getSubmissionStatusProportion() || [],
        [analyzer],
    );

    return (
        <section className={className}>
            <h2 className="text-2xl mb-6 sm:mb-2">Submission Analytics</h2>
            <div className="flex justify-between sm:items-center flex-col sm:flex-row max-w-[80%] sm:max-w-none">
                <ProportionMessages
                    dataArray={statusDataArray}
                    total={analyzer?.submissions.length || 0}
                />
                <CategoricalChart chartType="pie" dataArray={statusDataArray} />
            </div>
        </section>
    );
};

export default SubmissionStatusAnalysis;
