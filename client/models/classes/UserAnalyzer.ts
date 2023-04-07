import { TrendPeriodMode } from '../enums';
import { IChartData, IExerciseWithId, IUserSubmissionPopulated } from '../interfaces';
import {
    getDifficultyChartDataArray,
    getLanguageChartDataArray,
    getSubmissionStatusDataArray,
    getTopicChartDataArray,
} from '../../utils/analysis-utils/categorical-analysis.util';
import {
    getDailyExerciseAttemptTrendData,
    getDailyExerciseCreationTrendData,
    getMonthlyExerciseAttemptTrendData,
    getMontlyExerciseCreationTrendData,
    getWeeklyExerciseAttemptTrendData,
    getWeeklyExerciseCreationTrendData,
    getYearlyExerciseAttemptTrendData,
    getYearlyExerciseCreationTrendData,
} from '../../utils/analysis-utils/trend-analysis.util';

export class UserAnalyzer {
    constructor(
        public exercises: IExerciseWithId[],
        public submissions: IUserSubmissionPopulated[],
    ) {}

    getDifficultyProportion(): IChartData[] {
        // return list of difficulty proportion of the exercises user has attempted
        return getDifficultyChartDataArray(this.submissions);
    }

    getLanguageProportion() {
        // return list of language proportion that user has used.
        return getLanguageChartDataArray(this.submissions);
    }

    getSubmissionStatusProportion() {
        // return list of submission status proportion (correct or incorrect) of the exercises user has attempted
        return getSubmissionStatusDataArray(this.submissions);
    }

    getTopicProportion() {
        // return list of topic proportion of the exercises user attempted
        return getTopicChartDataArray(this.submissions);
    }

    getExerciseCreationTrend(
        trendMode: TrendPeriodMode,
        numPeriods: number = 5,
    ): IChartData[] {
        // There are four trend analysis modes: Day, Week, Month and Year.
        switch (trendMode) {
            case TrendPeriodMode.DAY:
                return getDailyExerciseCreationTrendData(this.exercises, numPeriods);
            case TrendPeriodMode.WEEK:
                return getWeeklyExerciseCreationTrendData(this.exercises, numPeriods);
            case TrendPeriodMode.MONTH:
                return getMontlyExerciseCreationTrendData(this.exercises, numPeriods);
            case TrendPeriodMode.YEAR:
                return getYearlyExerciseCreationTrendData(this.exercises, numPeriods);
            default:
                return getDailyExerciseCreationTrendData(this.exercises, numPeriods);
        }
    }

    getExerciseAttemptTrend(
        trendMode: TrendPeriodMode,
        numPeriods: number = 5,
        correctStatus: boolean | null = null,
    ): IChartData[] {
        const submissionsFiltered = this.getSubmissionsByCorrectStatus(correctStatus);

        // There are four trend analysis modes for exercise attempt trend analysis: Day, Week, Month and Year.
        switch (trendMode) {
            case TrendPeriodMode.DAY:
                return getDailyExerciseAttemptTrendData(submissionsFiltered, numPeriods);
            case TrendPeriodMode.WEEK:
                return getWeeklyExerciseAttemptTrendData(submissionsFiltered, numPeriods);
            case TrendPeriodMode.MONTH:
                return getMonthlyExerciseAttemptTrendData(
                    submissionsFiltered,
                    numPeriods,
                );
            case TrendPeriodMode.YEAR:
                return getYearlyExerciseAttemptTrendData(submissionsFiltered, numPeriods);
            default:
                return getDailyExerciseAttemptTrendData(submissionsFiltered, numPeriods);
        }
    }

    getSubmissionsByCorrectStatus(correctStatus: boolean | null) {
        if (correctStatus === null) return this.submissions;
        return this.submissions.filter((sub) => sub.correct === correctStatus);
    }
}
