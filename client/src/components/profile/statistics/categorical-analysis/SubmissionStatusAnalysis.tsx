import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import CategoricalChart from '../../../ui/charts/CategoricalChart';
import ProportionMessages from './ProportionMessages';

const SubmissionStatusAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    const statusDataArray: IChartData[] = useMemo(
        () => analyzer?.getSubmissionStatusProportion() || [],
        [analyzer],
    );

    return (
        <section className="">
            <h2 className="text-2xl basis-full">Submission Analytics</h2>
            <div className="flex-start flex-wrap gap-x-6">
                <ProportionMessages
                    dataArray={statusDataArray}
                    total={analyzer?.submissions.length || 0}
                />
                <CategoricalChart
                    chartType="pie"
                    dataArray={statusDataArray}
                    width="280px"
                    height="280px"
                />
            </div>
        </section>
    );
};

export default SubmissionStatusAnalysis;
