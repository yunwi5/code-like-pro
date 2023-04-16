import React, { useMemo, useState } from 'react';

import { TrendPeriodMode } from '../../../../models/enums';
import { IChartData, ITrendDataset } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import { ExerciseAttemptColor, FailureColor, SuccessColor } from '../../../../utils/colors.util';
import TrendChart from '../../../ui/charts/TrendChart';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const numberOfPeriods = [5, 10, 15, 20];

function getTrendDatasetArray(
  totalAttemptTrend: IChartData[],
  successAttemptTrend: IChartData[],
  failureAttemptTrend: IChartData[],
) {
  const totalTrendDataset: ITrendDataset = {
    label: 'Total Attempts',
    dataArray: totalAttemptTrend,
    backgroundColor: ExerciseAttemptColor.backgroundColor,
    borderColor: ExerciseAttemptColor.borderColor,
  };

  const successTrendDataset: ITrendDataset = {
    label: 'Total Successes',
    dataArray: successAttemptTrend,
    backgroundColor: SuccessColor.backgroundColor,
    borderColor: SuccessColor.borderColor,
  };

  const failureTrendDataset: ITrendDataset = {
    label: 'Total Failures',
    dataArray: failureAttemptTrend,
    backgroundColor: FailureColor.backgroundColor,
    borderColor: FailureColor.borderColor,
  };

  return [totalTrendDataset, successTrendDataset, failureTrendDataset];
}

const ExerciseAttemptTrend: React.FC<{ trendMode: TrendPeriodMode }> = ({ trendMode }) => {
  const { analyzer } = useAnalysisContext();
  // Number of periods to visualize on the chart. i.e. 5, 10, 15, or 20 recent days.
  const [numPeriods, setNumPeriods] = useState(5);

  const [totalAttemptTrend, successAttemptTrend, failureAttemptTrend] = useMemo(() => {
    return [
      analyzer?.getExerciseAttemptTrend(trendMode, numPeriods) || [],
      analyzer?.getExerciseAttemptTrend(trendMode, numPeriods, true) || [],
      analyzer?.getExerciseAttemptTrend(trendMode, numPeriods, false) || [],
    ];
  }, [analyzer, trendMode, numPeriods]);

  const attemptTrendDataArray = getTrendDatasetArray(
    totalAttemptTrend,
    successAttemptTrend,
    failureAttemptTrend,
  );

  const periodOptions = numberOfPeriods.map((period) => `${period} ${trendMode}s`);

  return (
    <div className="flex-1">
      <div className="flex-between mb-2 pr-[3.5%]">
        <h2 className="text-2xl basis-full">Exercise Attempts</h2>
        <CustomSelect
          id="period-select"
          options={numberOfPeriods}
          optionLabels={periodOptions}
          onChange={(newPeriod) => setNumPeriods(parseInt(newPeriod))}
        />
      </div>
      <TrendChart trendDatasets={attemptTrendDataArray} />
    </div>
  );
};

export default ExerciseAttemptTrend;
