import { IChartData } from '../../models/interfaces';

export function generateChartDataset(
    chartDataArray: IChartData[],
    generateColors: boolean = true,
) {
    const labels = chartDataArray.map((cd) => cd.label);
    const data = chartDataArray.map((cd) => cd.value);
    if (!generateColors) return { labels, data };

    const backgroundColors = chartDataArray.map((cd) => cd.backgroundColor);
    const borderColors = chartDataArray.map((cd) =>
        cd.borderColor ? cd.borderColor : '#fff',
    ); // defaut border color
    return { labels, data, backgroundColors, borderColors };
}
