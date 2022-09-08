import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import ProportionChart from '../../../ui/charts/ProportionChart';
import ProfileLoader from '../../ProfileLoader';
import ProportionMessages from './ProportionMessages';

const SubmissionStatusAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    if (analyzer == null) return <ProfileLoader />;

    const statusDataArray: IChartData[] = useMemo(
        () => analyzer.getSubmissionStatusProportion(),
        [analyzer],
    );

    return (
        <section className="">
            <h2 className="text-2xl basis-full">Submission Analytics</h2>
            <div className="flex-start flex-wrap gap-x-6">
                <ProportionMessages
                    dataArray={statusDataArray}
                    total={analyzer.submissions.length}
                />
                <ProportionChart
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
