import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { ITrendDataset } from '../../../models/interfaces';
import { generateChartDataset } from '../../../utils/analysis-utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const, // control data labels position
        },
    },
    scale: {
        ticks: {
            precision: 0,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

interface Props {
    trendDatasets: ITrendDataset[];
}

const TrendChart: React.FC<Props> = (props) => {
    const { trendDatasets } = props;

    if (trendDatasets.length === 0) return null;

    const { labels } = generateChartDataset(trendDatasets[0].dataArray, false);

    const dataset = {
        labels,
        datasets: trendDatasets.map((dataset) => ({
            label: dataset.label,
            data: generateChartDataset(dataset.dataArray, false).data,
            fill: true,
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
            borderWidth: dataset.borderWidth ?? 1.5,
            tension: 0.2,
        })),
    };

    return (
        <div>
            <Line
                className="max-h-[20rem] max-w-[100%]"
                options={options}
                data={dataset}
            />
        </div>
    );
};

export default TrendChart;
