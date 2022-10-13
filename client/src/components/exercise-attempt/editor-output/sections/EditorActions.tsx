import { Link } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { BsListUl } from 'react-icons/bs';
import { RiSlideshow3Line } from 'react-icons/ri';

import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { getShowcasePageLink } from '../../../../utils/links';
import Button from '../../../ui/buttons/Button';

const EditorActions = () => {
    const { runCode, isLoading, submitCode, userSubmission, exercise } =
        useExerciseAttemptCtx();

    const userGotCorrect = !!userSubmission?.correct;

    return (
        <div className="py-3 px-2 flex xs:items-center justify-between flex-col xs:flex-row gap-y-3">
            <div className="flex flex-col xs:flex-row gap-2">
                <Link
                    to={`/browse`}
                    className="btn-small py-[0.3rem] flex-center gap-1 text-[1.08rem] text-gray-700 rounded-sm shadow-md bg-gray-300 hover:bg-gray-600/90 hover:text-gray-50"
                >
                    <BsListUl /> List
                </Link>
                {userGotCorrect && (
                    <Link
                        to={getShowcasePageLink(exercise?._id || '')}
                        className="btn-small py-[0.3rem] flex-center gap-1 text-[1.08rem] text-gray-700 rounded-sm shadow-md bg-gray-300 hover:bg-gray-600/90 hover:text-gray-50"
                    >
                        <RiSlideshow3Line />
                        ShowCase
                    </Link>
                )}
            </div>
            {!isLoading && (
                <div className="xs:ml-auto flex flex-col xs:flex-row gap-2">
                    <Button onClick={runCode} size="small" mode="empty">
                        Run Code
                    </Button>
                    <Button onClick={submitCode} size="small" mode="fill">
                        Submit Code
                    </Button>
                </div>
            )}
            {isLoading && (
                <PropagateLoader color="#5552e4" size={15} className="mr-[5.5rem]" />
            )}
        </div>
    );
};

export default EditorActions;
