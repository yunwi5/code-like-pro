import React, { useMemo, useState } from 'react';
import { TrendPeriodMode } from '../../../../models/enums';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { ExerciseCreationColor } from '../../../../utils/colors';
import TrendChart from '../../../ui/charts/TrendChart';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const numberOfPeriods = [5, 10, 15, 20, 25];

const ExerciseCreationTrend: React.FC<{ trendMode: TrendPeriodMode }> = ({
    trendMode,
}) => {
    const { analyzer } = useAnalysisContext();
    // Number of periods to visualize on the chart. i.e. 5, 10, 15, or 20 recent days.
    const [numPeriods, setNumPeriods] = useState(5);

    const chartDataArray: IChartData[] = useMemo(
        () => analyzer?.getExerciseCreationTrend(trendMode, numPeriods) || [],
        [analyzer, trendMode, numPeriods],
    );

    const periodOptions = numberOfPeriods.map((period) => `${period} ${trendMode}s`);

    return (
        <div className={`flex-1`}>
            <div className="flex-between pr-[3.5%]">
                <h2 className="text-2xl basis-full">Exercise Creations</h2>
                <CustomSelect
                    id="period-select"
                    options={numberOfPeriods}
                    optionLabels={periodOptions}
                    onChange={(newPeriod) => setNumPeriods(parseInt(newPeriod))}
                />
            </div>
            <TrendChart
                chartLabel={'Exercise Creations'}
                dataArray={chartDataArray}
                fillColor={ExerciseCreationColor.fillColor}
                outlineColor={ExerciseCreationColor.outlineColor}
            />
        </div>
    );
};

export default ExerciseCreationTrend;
