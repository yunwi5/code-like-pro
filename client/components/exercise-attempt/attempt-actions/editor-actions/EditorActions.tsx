import { BsListUl } from 'react-icons/bs';
import { RiSlideshow3Line } from 'react-icons/ri';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Link from 'next/link';

import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { getShowcasePageLink } from '../../../../utils/links.util';
import Button from '../../../ui/buttons/Button';

const EditorActions = () => {
  const { runCode, isLoading, submitCode, userSubmission, exercise } = useExerciseAttemptCtx();

  const userGotCorrect = !!userSubmission?.correct;

  return (
    <div className="px-2 lg:px-0 lg:pr-2 py-3 flex sm:items-center justify-between flex-col sm:flex-row gap-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href="/browse"
          className="hidden sm:flex flex-center gap-1 btn-small py-[0.3rem] text-[1.08rem] text-gray-700 rounded-sm shadow-md bg-gray-300 hover:bg-gray-600/90 hover:text-gray-50"
        >
          <BsListUl /> List
        </Link>
        {userGotCorrect && (
          <Link
            href={getShowcasePageLink(exercise?._id || '')}
            className="btn-small py-[0.3rem] flex-center gap-1 text-[1.08rem] text-gray-700 rounded-sm shadow-md bg-gray-300 hover:bg-gray-600/90 hover:text-gray-50"
          >
            <RiSlideshow3Line />
            ShowCase
          </Link>
        )}
      </div>
      {!isLoading && (
        <div className="sm:ml-auto flex flex-col sm:flex-row gap-2">
          <Button onClick={runCode} size="small" mode="empty">
            Run Code
          </Button>
          <Button onClick={submitCode} size="small" mode="fill">
            Submit Code
          </Button>
        </div>
      )}
      {isLoading && <PropagateLoader color="#5552e4" size={15} className="mr-[5.5rem]" />}
    </div>
  );
};

export default EditorActions;
