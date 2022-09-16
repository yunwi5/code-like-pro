import React, { useMemo, useState } from 'react';
import { TrendPeriodMode } from '../../../../models/enums';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { ExerciseAttemptColor } from '../../../../utils/analysis-utils/analysis-color';
import TrendChart from '../../../ui/charts/TrendChart';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const numberOfPeriods = [5, 10, 15, 20];

const ExerciseAttemptTrend: React.FC<{ trendMode: TrendPeriodMode }> = ({ trendMode }) => {
    const { analyzer } = useAnalysisContext();
    // Number of periods to visualize on the chart. i.e. 5, 10, 15, or 20 recent days.
    const [numPeriods, setNumPeriods] = useState(5);

    const chartDataArray: IChartData[] = useMemo(
        () => analyzer?.getExerciseAttemptTrend(trendMode, numPeriods) || [],
        [analyzer, trendMode, numPeriods],
    );

    const periodOptions = numberOfPeriods.map((period) => `${period} ${trendMode}s`);

    return (
        <div className="flex-1">
            <div className="flex-between pr-[3.5%]">
                <h2 className="text-2xl basis-full">Exercise Attempts</h2>
                <CustomSelect
                    id="period-select"
                    options={numberOfPeriods}
                    optionLabels={periodOptions}
                    onChange={(newPeriod) => setNumPeriods(parseInt(newPeriod))}
                />
            </div>
            <TrendChart
                chartLabel={'Exercise Attempts'}
                dataArray={chartDataArray}
                fillColor={ExerciseAttemptColor.fillColor}
                outlineColor={ExerciseAttemptColor.outlineColor}
            />
        </div>
    );
};

export default ExerciseAttemptTrend;
