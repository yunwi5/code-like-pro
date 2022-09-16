import { DifficultyList, ProgrammingTopicList, SubmissionStatus } from '../../models/enums';
import { IChartData, IUserSubmissionPopulated } from '../../models/interfaces';
import {
    DifficultyColorMap,
    getLightColorByIndex,
    LanguageColorMap,
    StatusColorMap,
} from './analysis-color';

export function getLanguageChartDataArray(
    submissions: IUserSubmissionPopulated[],
): IChartData[] {
    const languageFreqMap: { [key: string]: number } = {};
    submissions.forEach((submission) => {
        const lang = submission.exercise.language;
        if (lang in languageFreqMap) languageFreqMap[lang]++;
        else languageFreqMap[lang] = 1;
    });
    return createChartDataArray(languageFreqMap, LanguageColorMap);
}

export function getSubmissionStatusDataArray(submissions: IUserSubmissionPopulated[]) {
    const statusFreqMap: { [key: string]: number } = {};
    submissions.forEach((submission) => {
        const status = submission.correct
            ? SubmissionStatus.CORRECT
            : SubmissionStatus.INCORRECT;
        if (status in statusFreqMap) statusFreqMap[status]++;
        else statusFreqMap[status] = 1;
    });
    return createChartDataArrayWithFixedLabels(statusFreqMap, StatusColorMap, [
        SubmissionStatus.CORRECT,
        SubmissionStatus.INCORRECT,
    ]);
}

export function getDifficultyChartDataArray(
    submissions: IUserSubmissionPopulated[],
): IChartData[] {
    const difficultyFreqMap: { [key: string]: number } = {};
    submissions.forEach((submission) => {
        const diff = submission.exercise.difficulty;
        if (diff in difficultyFreqMap) difficultyFreqMap[diff]++;
        else difficultyFreqMap[diff] = 1;
    });

    return createChartDataArrayWithFixedLabels(
        difficultyFreqMap,
        DifficultyColorMap,
        DifficultyList,
    );
}

export function getTopicChartDataArray(submissions: IUserSubmissionPopulated[]) {
    const topicFreqMap: { [key: string]: number } = {};
    submissions.forEach((submission) => {
        for (const tag of submission.exercise.tags) {
            if (tag in topicFreqMap) topicFreqMap[tag]++;
            else topicFreqMap[tag] = 1;
        }
    });

    const chartDataList: IChartData[] = [];
    ProgrammingTopicList.forEach((topic, idx) => {
        const data: IChartData = {
            label: topic,
            value: topicFreqMap[topic] ?? 0,
            backgroundColor: getLightColorByIndex(idx),
        };
        chartDataList.push(data);
    });
    return chartDataList;
}

// Creating actual chart data with dynamic keys from the freqMap
export function createChartDataArray(
    freqMap: { [key: string]: number },
    colorMap: { [key: string]: string },
) {
    const chartDataList = [];
    for (const key in freqMap) {
        const data: IChartData = {
            label: key,
            value: freqMap[key] ?? 0,
            backgroundColor: colorMap[key],
        };
        chartDataList.push(data);
    }
    return chartDataList;
}

// Creating actual chart data with static/fixed keys from the chartLabels array
export function createChartDataArrayWithFixedLabels(
    freqMap: { [key: string]: number },
    colorMap: { [key: string]: string },
    chartLabels: string[] | readonly string[],
) {
    const chartDataList = [];
    for (const label of chartLabels) {
        const data: IChartData = {
            label: label,
            value: freqMap[label] ?? 0,
            backgroundColor: colorMap[label],
        };
        chartDataList.push(data);
    }
    return chartDataList;
}
