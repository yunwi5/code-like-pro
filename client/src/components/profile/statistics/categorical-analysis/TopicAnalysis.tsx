import React, { useMemo } from 'react';
import { IChartData } from '../../../../models/interfaces';
import { useAnalysisContext } from '../../../../store/context/AnalysisContext';
import CategoricalChart from '../../../ui/charts/CategoricalChart';

const TopicAnalysis: React.FC = () => {
    const { analyzer } = useAnalysisContext();

    const topicDataArray = useMemo(() => analyzer?.getTopicProportion() || [], [analyzer]);

    return (
        <section>
            <h2 className="mt-8 text-2xl basis-full">Programming Topic</h2>
            <div className="flex flex-col gap-5">
                <CategoricalChart
                    dataArray={topicDataArray}
                    chartType="bar"
                    width="100%"
                    height="200px"
                    legendPosition="bottom"
                />
                <TopicAnalysisMessages dataArray={topicDataArray} />
            </div>
        </section>
    );
};

const TopicAnalysisMessages: React.FC<{ dataArray: IChartData[] }> = ({ dataArray }) => {
    // Most frequent topics 1 or more.
    function getMostFrequentData(dataArray: IChartData[]) {
        let mostFrequentOnes: IChartData[] = [];
        dataArray.forEach((topicData) => {
            if (mostFrequentOnes.length === 0) mostFrequentOnes.push(topicData);
            else {
                if (mostFrequentOnes[0].value < topicData.value) {
                    mostFrequentOnes = [topicData];
                } else if (mostFrequentOnes[0].value === topicData.value) {
                    mostFrequentOnes.push(topicData);
                }
            }
        });
        return mostFrequentOnes;
    }

    const mostFrequentTopics = useMemo(() => getMostFrequentData(dataArray), []);

    return (
        <div className="flex flex-wrap items-center gap-x-2">
            Programming topic
            {mostFrequentTopics.length > 1 && 's'} you practiced the most are{' '}
            {mostFrequentTopics.map((topicData, idx) => {
                let suffix: JSX.Element | string = '';
                if (idx === mostFrequentTopics.length - 2) {
                    suffix = <span>&nbsp; and</span>;
                } else if (idx < mostFrequentTopics.length - 2) {
                    suffix = ', ';
                }
                return (
                    <span key={idx}>
                        <strong className="text-semibold text-gray-600">
                            {topicData.label}
                        </strong>{' '}
                        ({topicData.value} times) {suffix}
                    </span>
                );
            })}
            .
        </div>
    );
};

export default TopicAnalysis;
