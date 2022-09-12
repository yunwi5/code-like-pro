import { FaListUl } from 'react-icons/fa';
import { GrRotateLeft } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useShowcase } from '../../store/context/ShowcaseContext';
import { getDifficultyColorClass } from '../../utils/difficulty';
import { getBrowsingPageLink, getExerciseAttemptPageLink } from '../../utils/links';
import Button from '../ui/buttons/Button';
import ExerciseSpec from '../ui/ExerciseSpec';
import LanguageLabel from '../ui/labels/LanguageLabel';

const ShowcaseHeader = () => {
    const navigate = useNavigate();
    const { exercise } = useShowcase();

    if (!exercise) return null;

    const colorClass = getDifficultyColorClass(exercise.difficulty);

    return (
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 px-4 py-3 bg-gray-100 rounded shadow">
            <div className="flex flex-col lg:gap-3">
                <div className="flex-start gap-5">
                    <h2 className="flex-start flex-wrap gap-3 text-gray-700 text-lg md:text-xl lg:text-2xl capitalize">
                        {exercise.name}
                    </h2>
                    <label
                        className={`px-2 py-1 text-sm lg:text-base border-2 ${colorClass} rounded-lg`}
                    >
                        {exercise.difficulty}
                    </label>
                    <LanguageLabel language={exercise.language} />
                </div>
                <ExerciseSpec exercise={exercise} />
            </div>

            {/* Header action buttons. Try again & Back to list */}
            <div className="flex flex-col sm:flex-row gap-2">
                <Button
                    onClick={() => navigate(getExerciseAttemptPageLink(exercise._id))}
                    mode="empty"
                    className="!text-base lg:text-lg"
                >
                    <span className="flex-center gap-2">
                        <GrRotateLeft className="text-xl lg:text-2xl" />
                        Practice Again
                    </span>
                </Button>
                <Button
                    onClick={() => navigate(getBrowsingPageLink())}
                    mode="fill"
                    className="lg:min-w-[10rem] !text-base lg:text-lg"
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
