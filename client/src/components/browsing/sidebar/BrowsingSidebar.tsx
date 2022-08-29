import DifficultyFilter from './sections/DifficultyFilter';
import ExerciseSearch from './sections/ExerciseSearch';
import ExerciseSorter from './sections/ExerciseSorter';
import LanguageAndStatusFilter from './sections/LanguageAndStatusFilter';
import TagsFilter from './sections/TagsFilter';

const BrowsingSidebar = () => {
    return (
        <aside className="lg:sticky top-5 flex flex-col gap-4 lg:basis-1/3 px-3 py-4 text-gray-700 bg-gray-200/90 rounded-sm shadow-md">
            <ExerciseSearch />
            <ExerciseSorter />
            <LanguageAndStatusFilter />
            <DifficultyFilter />
            <TagsFilter />
        </aside>
    );
};

export default BrowsingSidebar;
