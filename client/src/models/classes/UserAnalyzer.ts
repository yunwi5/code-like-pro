import { TrendPeriodMode } from '../enums';
import { IChartData, IExerciseWithId, IUserSubmissionPopulated } from '../interfaces';
import {
    getDifficultyChartDataArray,
    getLanguageChartDataArray,
    getSubmissionStatusDataArray,
    getTopicChartDataArray,
} from '../../utils/analysis-utils/categorical-analysis';
import {
    getDailyExerciseAttemptTrendData,
    getDailyExerciseCreationTrendData,
    getMonthlyExerciseAttemptTrendData,
    getMontlyExerciseCreationTrendData,
    getWeeklyExerciseAttemptTrendData,
    getWeeklyExerciseCreationTrendData,
    getYearlyExerciseAttemptTrendData,
    getYearlyExerciseCreationTrendData,
} from '../../utils/analysis-utils/trend-analysis';

export class UserAnalyzer {
    exercises: IExerciseWithId[]; // List of exercises user has created.
    submissions: IUserSubmissionPopulated[];

    constructor(exercises: IExerciseWithId[], submissions: IUserSubmissionPopulated[]) {
        this.exercises = exercises;
        this.submissions = submissions;
    }

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
        // return trend data of user exercise creations as a list
    }

    getExerciseAttemptTrend(trendMode: TrendPeriodMode, numPeriods: number = 5): IChartData[] {
        // There are four trend analysis modes for exercise attempt trend analysis: Day, Week, Month and Year.
        switch (trendMode) {
            case TrendPeriodMode.DAY:
                return getDailyExerciseAttemptTrendData(this.submissions, numPeriods);
            case TrendPeriodMode.WEEK:
                return getWeeklyExerciseAttemptTrendData(this.submissions, numPeriods);
            case TrendPeriodMode.MONTH:
                return getMonthlyExerciseAttemptTrendData(this.submissions, numPeriods);
            case TrendPeriodMode.YEAR:
                return getYearlyExerciseAttemptTrendData(this.submissions, numPeriods);
            default:
                return getDailyExerciseAttemptTrendData(this.submissions, numPeriods);
        }
        // return trend data of user exercise attempts as a list
    }
}
