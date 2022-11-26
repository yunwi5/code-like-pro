import { FC } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { TbBulb } from 'react-icons/tb';
import { Difficulty } from '../../../../models/enums';
import { IExerciseWithId } from '../../../../models/interfaces';
import { DifficultyTextColorMap } from '../../../../utils/colors';
import {
    getAverageDifficultyByRatings,
    getOverallDifficulty,
    mapDifficultyToNumericValue,
    MAX_DIFFICULTY_VALUE,
} from '../../../../utils/difficulty';
import InfoTooltip from '../../../ui/tooltip/InfoTooltip';

type Props = { exercise: IExerciseWithId };

const DifficultyAdjustmentInfo: FC<Props> = ({ exercise }) => {
    const { averageDifficulty, averageRatingRounded } =
        getAverageDifficultyByRatings(exercise);
    const { overallDifficulty, overallRatingRounded } = getOverallDifficulty(exercise);

    const creatorDifficultyValue = mapDifficultyToNumericValue(exercise.difficulty);

    const content = (
        <div className="flex flex-col gap-2 w-[25rem] text-base normal-case">
            <h3 className="text-lg font-semibold text-main-500">
                <TbBulb className="inline-block mr-1 text-[1.2em] -translate-y-[2px]" />
                How the overall difficulty is calculated
            </h3>

            <p>
                We consider creator's difficulty <strong>(25%)</strong> and users' average
                difficulty ratings <strong>(75%)</strong>
            </p>

            <div>
                <h4 className="flex-start gap-2">
                    Creator's Difficulty:{' '}
                    <span
                        style={{
                            color: DifficultyTextColorMap[exercise.difficulty],
                        }}
                        className="font-semibold"
                    >
                        {averageDifficulty}&nbsp;
                        <span className="text-base">
                            ({creatorDifficultyValue} / {MAX_DIFFICULTY_VALUE})
                        </span>
                    </span>
                </h4>
                <h4 className="flex-start items-center gap-2">
                    Average Difficulty:{' '}
                    <span
                        style={{
                            color: DifficultyTextColorMap[
                                averageDifficulty || exercise.difficulty
                            ],
                        }}
                        className="font-semibold"
                    >
                        {averageDifficulty}&nbsp;
                        <span className="text-base">
                            ({averageRatingRounded} / {MAX_DIFFICULTY_VALUE})
                        </span>
                    </span>
                </h4>
            </div>

            <div>
                Overall Difficulty = {creatorDifficultyValue} x 0.25 +{' '}
                {averageRatingRounded} x 0.75 ={' '}
                <span
                    className="font-semibold"
                    style={{ color: DifficultyTextColorMap[overallDifficulty] }}
                >
                    {overallDifficulty} ({overallRatingRounded} / {MAX_DIFFICULTY_VALUE})
                </span>
            </div>

            <div className="mt-1">
                <h4>Difficulty Numeric Ranges:</h4>

                <div className="grid grid-cols-2">
                    {difficultyRanges.map(({ difficulty, range }) => (
                        <span
                            key={`${difficulty}-${range}`}
                            className="font-semibold"
                            style={{ color: DifficultyTextColorMap[difficulty] }}
                        >
                            {difficulty}&ensp;{range}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    return <InfoTooltip content={content} />;
};

const difficultyRanges = [
    { difficulty: Difficulty.EASY, range: '1 - 1.49' },
    { difficulty: Difficulty.MEDIUM, range: '1.5 - 2.49' },
    { difficulty: Difficulty.HARD, range: '2.5 - 2.49' },
    { difficulty: Difficulty.EXPERT, range: '3.5 - 4' },
];

export default DifficultyAdjustmentInfo;
