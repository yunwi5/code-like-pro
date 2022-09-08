import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie, Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import { IChartData } from '../../../models/interfaces';
import { generateChartDataset } from '../../../utils/analysis-utils/chart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
); // registration

const barOptions = {
    responsive: true,
    // maintainAspectRatio: false, // experimental
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

interface Props {
    chartType?: 'pie' | 'doughnut' | 'bar';
    dataArray: IChartData[];
    width?: string;
    height?: string;
    legendPosition?: 'top' | 'left' | 'right' | 'bottom';
}

const CategoricalChart: React.FC<Props> = (props) => {
    const {
        chartType = 'pie',
        dataArray,
        width = '400px',
        height = '400px',
        legendPosition,
    } = props;
    const { labels, data, backgroundColors, borderColors } = generateChartDataset(dataArray);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: legendPosition || ('bottom' as const),
            },
        },
    };

    let dataset = {
        labels,
        datasets: [
            {
                label: 'Chart Label',
                data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            {chartType === 'pie' && (
                <Pie width={width} height={height} options={options} data={dataset} />
            )}
            {chartType === 'doughnut' && <Doughnut options={options} data={dataset} />}
            {chartType === 'bar' && (
                <Bar className="max-h-[22.5rem]" options={barOptions} data={dataset} />
            )}
        </div>
    );
};

export default CategoricalChart;
