import { IChartData } from '../../models/interfaces';

export function generateChartDataset(chartDataArray: IChartData[], generateColors: boolean = true) {
  const labels = chartDataArray.map((cd) => cd.label);
  const data = chartDataArray.map((cd) => cd.value);
  if (!generateColors) return { labels, data };

  const backgroundColors = chartDataArray.map((cd) => cd.backgroundColor);
  const borderColors = chartDataArray.map((cd) => (cd.borderColor ? cd.borderColor : '#fff')); // defaut border color
  return { labels, data, backgroundColors, borderColors };
}

// Within an array of IChartData, find the data of the highest value(s) one or multiple.
// Return chart data of the highest value as a list.
export function getMostFrequentChartData(dataArray: IChartData[]) {
  if (dataArray.length === 0) return [];
  let mostFrequentOnes: IChartData[] = [];

  dataArray.forEach((data) => {
    if (mostFrequentOnes.length === 0) mostFrequentOnes.push(data);
    else {
      if (mostFrequentOnes[0].value < data.value) {
        mostFrequentOnes = [data];
      } else if (mostFrequentOnes[0].value === data.value) {
        mostFrequentOnes.push(data);
      }
    }
  });
  return mostFrequentOnes;
}
