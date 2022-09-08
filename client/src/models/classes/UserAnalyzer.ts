import { AnalysisPeriod } from '../enums';
import { IChartData, IExerciseWithId, IUserSubmissionPopulated } from '../interfaces';
import {
    getDifficultyChartDataArray,
    getLanguageChartDataArray,
    getSubmissionStatusDataArray,
    getTopicChartDataArray,
} from '../../utils/analysis-utils/categorical-analysis';

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

    getExerciseAttemptTrend(analysisPeriod: AnalysisPeriod, numPeriods: number = 5) {
        // return trend data of user exercise attempts as a list
    }

    getExerciseCreationTrend(analysisPeriod: AnalysisPeriod, numPeriods: number = 5) {
        // return trend data of user exercise creations as a list
    }
}
