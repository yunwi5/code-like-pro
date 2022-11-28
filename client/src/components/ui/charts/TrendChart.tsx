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

import { IChartData } from '../../../models/interfaces';
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
    dataArray: IChartData[];
    fillColor: string; // chart fill color
    outlineColor: string; // chart outline color
    chartLabel: string;
}

const TrendChart: React.FC<Props> = (props) => {
    const { dataArray, fillColor, outlineColor, chartLabel } = props;

    const { labels, data } = generateChartDataset(dataArray, false);

    const dataset = {
        labels,
        datasets: [
            {
                label: chartLabel,
                data: data,
                fill: true,
                backgroundColor: fillColor,
                borderColor: outlineColor,
                borderWidth: 1.5,
            },
        ],
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
