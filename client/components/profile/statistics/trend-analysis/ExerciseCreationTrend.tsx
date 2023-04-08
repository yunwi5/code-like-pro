import React, { useMemo, useState } from 'react';
import { TrendPeriodMode } from '../../../../models/enums';
import { IChartData, ITrendDataset } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { ExerciseCreationColor } from '../../../../utils/colors.util';
import CustomSelect from '../../../ui/inputs/CustomSelect';
import TrendChart from '../../../ui/charts/TrendChart';

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

  const trendDataset: ITrendDataset = {
    label: 'Exercise Creations',
    dataArray: chartDataArray,
    backgroundColor: ExerciseCreationColor.backgroundColor,
    borderColor: ExerciseCreationColor.borderColor,
  };

  const periodOptions = numberOfPeriods.map((period) => `${period} ${trendMode}s`);

  return (
    <div className={`flex-1`}>
      <div className="flex-between mb-2 pr-[3.5%]">
        <h2 className="text-2xl basis-full">Exercise Creations</h2>
        <CustomSelect
          id="period-select"
          options={numberOfPeriods}
          optionLabels={periodOptions}
          onChange={(newPeriod) => setNumPeriods(parseInt(newPeriod))}
        />
      </div>
      <TrendChart trendDatasets={[trendDataset]} />
    </div>
  );
};

export default ExerciseCreationTrend;
