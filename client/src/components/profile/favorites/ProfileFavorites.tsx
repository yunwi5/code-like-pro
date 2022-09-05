import useExerciseSearch from '../../../hooks/useExerciseSearch';
import { SearchKey, SearchKeyList } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { mapExercisesToExerciseCards } from '../../../utils/exercise-utils/exercise';
import ExerciseList from '../../ui/ExerciseList';
import Searchbar from '../../ui/inputs/Searchbar';
import ProfileSectionContainer from '../containers/ProfileSectionContainer';
import ProfileLoader from '../ProfileLoader';

const ProfileFavorites = () => {
    const { userDetail } = useUserContext();
    const likedExercises = userDetail?.liked || [];
    const exerciseCards = mapExercisesToExerciseCards(likedExercises);
    const {
        exercises: searchedExercises,
        searchState,
        setSearchKey,
        setSearchText,
    } = useExerciseSearch(exerciseCards);

    // It means loading state, so show the loading spinner.
    if (!userDetail?.liked) return <ProfileLoader />;

    return (
        <ProfileSectionContainer>
            <nav className="flex-between !items-end mb-6">
                <Searchbar
                    onKeyChange={(newKey) => setSearchKey(newKey as SearchKey)}
                    onTextChange={(text) => setSearchText(text)}
                    keyValue={searchState.key}
                    textValue={searchState.text}
                    searchKeys={SearchKeyList}
                    label={null}
                />
                <h2 className="text-gray-500 font-semibold text-xl">
                    {searchedExercises.length} Exercises
                </h2>
            </nav>
            <ExerciseList exercises={searchedExercises} exercisePerPage={5} />
        </ProfileSectionContainer>
    );
};

export default ProfileFavorites;
