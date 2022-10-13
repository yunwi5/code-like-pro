import { BsShuffle } from 'react-icons/bs';
import { IExerciseCard } from '../../../models/interfaces';
import { shuffleList } from '../../../utils/random';
import HoveringLabel from '../../ui/labels/HoveringLabel';
import DifficultyFilter from './sections/DifficultyFilter';
import ExerciseSearch from './sections/ExerciseSearch';
import ExerciseSorter from './sections/ExerciseSorter';
import LanguageAndStatusFilter from './sections/LanguageAndStatusFilter';
import TagsFilter from './sections/TagsFilter';

interface Props {
    exercises: IExerciseCard[];
    onShuffle: (shuffled: IExerciseCard[]) => void;
}

const BrowsingSidebar: React.FC<Props> = ({ exercises, onShuffle }) => {
    const shuffleExercises = () => {
        const shuffled = shuffleList(exercises);
        onShuffle(shuffled);
    };

    return (
        <aside className="lg:sticky top-16 flex flex-col gap-4 lg:basis-1/3 px-3 py-4 text-gray-700 bg-gray-200/90 rounded-sm shadow-md">
            <div className="-mb-2 flex-between">
                <h3 className="text-lg">Find Your Best Fit</h3>
                <HoveringLabel
                    onClick={shuffleExercises}
                    label={<span className="hover:text-blue-200">Shuffle</span>}
                >
                    <BsShuffle className="text-xl hover:text-blue-500 cursor-pointer" />
                </HoveringLabel>
            </div>
            <ExerciseSearch />
            <ExerciseSorter />
            <LanguageAndStatusFilter />
            <DifficultyFilter />
            <TagsFilter exercises={exercises} />
        </aside>
    );
};

export default BrowsingSidebar;
