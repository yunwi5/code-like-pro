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
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import { IChartData } from '../../../models/interfaces';
import { generateChartDataset } from '../../../utils/analysis-utils';
import { AiFillRobot } from 'react-icons/ai';

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
    chartLabel?: string;
}

const CategoricalChart: React.FC<Props> = (props) => {
    const {
        chartType = 'pie',
        dataArray,
        width = '400px',
        height = '400px',
        chartLabel = 'Analysis',
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
                label: chartLabel,
                data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    // Check if the user has no data. If the user has no data,
    // display alternative message instead of an empty chart.
    const datasetIsEmpty = data.reduce((acc, curr) => acc + curr, 0) === 0;

    return (
        <div>
            {datasetIsEmpty && (
                <h3 className="flex-center flex-col text-2xl h-[18rem]">
                    <AiFillRobot className="text-main-400" />
                    <span className="text-gray-500">You don't have data yet!</span>
                </h3>
            )}
            {!datasetIsEmpty && (
                <>
                    {chartType === 'pie' && (
                        <Pie width={width} height={height} options={options} data={dataset} />
                    )}
                    {chartType === 'doughnut' && <Doughnut options={options} data={dataset} />}
                    {chartType === 'bar' && (
                        <Bar className="max-h-[22.5rem]" options={barOptions} data={dataset} />
                    )}
                </>
            )}
        </div>
    );
};

export default CategoricalChart;
