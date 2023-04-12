import { FC, useMemo } from 'react';

import { DifficultyList } from '../../../../models/enums';
import { IDifficultyVote } from '../../../../models/interfaces';
import { createChartDataArrayWithFixedLabels } from '../../../../utils/analysis-utils/categorical-analysis.util';
import { DifficultyColorMap, DifficultyTextColorMap } from '../../../../utils/colors.util';
import CategoricalChart from '../../../ui/charts/CategoricalChart';

const getDifficultyChartDataArray = (difficultyVotes: IDifficultyVote[]) => {
  const difficultyFreqMap: { [key: string]: number } = {};
  difficultyVotes.forEach((vote) => {
    const diff = vote.type;
    if (diff in difficultyFreqMap) difficultyFreqMap[diff]++;
    else difficultyFreqMap[diff] = 1;
  });

  return createChartDataArrayWithFixedLabels(difficultyFreqMap, DifficultyColorMap, DifficultyList);
};

const DifficultyVoteChart: FC<{ difficultyVotes: IDifficultyVote[] }> = ({ difficultyVotes }) => {
  const difficultyDataArray = useMemo(
    () => getDifficultyChartDataArray(difficultyVotes),
    [difficultyVotes],
  );

  return (
    <CategoricalChart
      chartType="bar"
      chartLabel="Rating Counts"
      legendPosition="top"
      style={{ maxHeight: '300px' }}
      axesLabelColors={DifficultyList.map((diff) => DifficultyTextColorMap[diff])}
      dataArray={difficultyDataArray}
    />
  );
};

export default DifficultyVoteChart;
