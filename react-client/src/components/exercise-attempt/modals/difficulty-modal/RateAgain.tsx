import { memo, FC } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { IDifficultyVote } from '../../../../models/interfaces';
import { DifficultyTextColorMap } from '../../../../utils/colors';
import Button from '../../../ui/buttons/Button';

const RateAgain: FC<{
    onRateAgain: () => void;
    userDifficultyVote: IDifficultyVote | undefined;
}> = memo(({ onRateAgain, userDifficultyVote }) => {
    return (
        <div className="mt-3 flex-start gap-3 flex-wrap">
            <p className="font-semibold">
                <BiEditAlt className="inline-block mr-1 text-[1.4em] text-main-500" />
                Want to fix your rating?
            </p>
            <Button onClick={onRateAgain} size="small" className="!py-1 !rounded">
                Rate Again!
            </Button>

            {userDifficultyVote && (
                <p className="ml-auto">
                    Your difficulty:{' '}
                    <span
                        style={{
                            color: DifficultyTextColorMap[userDifficultyVote.type],
                        }}
                        className="font-semibold"
                    >
                        {userDifficultyVote.type}
                    </span>
                </p>
            )}
        </div>
    );
});

export default RateAgain;
