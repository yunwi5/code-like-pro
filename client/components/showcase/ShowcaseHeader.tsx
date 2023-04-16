import { FaListUl } from 'react-icons/fa';
import { GrRotateLeft } from 'react-icons/gr';
import { useRouter } from 'next/navigation';

import { useShowcaseContext } from '../../store/context/ShowcaseContext';
import { getDifficultyBtnClass } from '../../utils/difficulty.util';
import { getBrowsingPageLink, getExerciseAttemptPageLink } from '../../utils/links.util';
import Button from '../ui/buttons/Button';
import LanguageLabel from '../ui/icons/LanguageIcon';
import ExerciseSpec from '../ui/spec/ExerciseSpec';

/* Header layout breakpoint is lg - 1024px  */
const ShowcaseHeader = () => {
  const router = useRouter();
  const { exercise } = useShowcaseContext();

  if (!exercise) return null;

  const colorClass = getDifficultyBtnClass(exercise.difficulty);

  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 px-4 py-3 bg-gray-100 rounded shadow">
      <div className="flex flex-col lg:gap-3">
        <div className="flex-start gap-5">
          <h2 className="flex-start flex-wrap gap-3 text-gray-700 text-lg md:text-xl lg:text-2xl capitalize">
            {exercise.name}
          </h2>
          <label className={`px-2 py-1 text-sm lg:text-base border-2 ${colorClass} rounded-lg`}>
            {exercise.difficulty}
          </label>
          <LanguageLabel language={exercise.language} />
        </div>
        <ExerciseSpec exercise={exercise} />
      </div>

      {/* Header action buttons. Try again & Back to list. Layout breakpoint is xs - 400px */}
      <div className="self-stretch lg:self-center flex-col xs:flex-row gap-2 hidden xs:flex">
        <Button
          onClick={() => router.push(getExerciseAttemptPageLink(exercise._id))}
          mode="empty"
          className="grow md:grow-0 !text-base lg:text-lg"
        >
          <span className="flex-center gap-2">
            <GrRotateLeft className="text-xl lg:text-2xl" />
            Practice Again
          </span>
        </Button>
        <Button
          onClick={() => router.push(getBrowsingPageLink())}
          mode="fill"
          className="grow md:grow-0 !text-base lg:text-lg min-w-[10rem]"
        >
          <span className="flex-center gap-2">
            <FaListUl className="text-xl" />
            Questions
          </span>
        </Button>
      </div>
    </header>
  );
};

export default ShowcaseHeader;
