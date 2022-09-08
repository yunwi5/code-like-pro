import useExerciseSearch from '../../../hooks/useExerciseSearch';
import { SearchKey, SearchKeyList } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { mapExercisesToExerciseCards } from '../../../utils/exercise-utils/exercise';
import ExerciseList from '../../ui/lists/ExerciseList';
import Searchbar from '../../ui/inputs/Searchbar';
import ProfileSectionContainer from '../containers/ProfileSectionContainer';
import ProfileLoader from '../ProfileLoader';

// Remote author from the filter, as creations page only contains exercises of one author.
const searchKeys = SearchKeyList.filter((key) => key !== SearchKey.AUTHOR);

const MyCreations = () => {
    const { userDetail } = useUserContext();
    const creations = userDetail?.exercises || [];
    const creationCards = mapExercisesToExerciseCards(creations, {
        isAuthorized: true,
        author: userDetail || undefined,
    });

    const {
        exercises: searchedCreations,
        searchState,
        setSearchKey,
        setSearchText,
    } = useExerciseSearch(creationCards);

    // It means loading state, so show the loading spinner.
    if (!userDetail?.exercises) return <ProfileLoader />;

    return (
        <ProfileSectionContainer>
            <nav className="flex-between !items-end mb-6">
                <Searchbar
                    onKeyChange={(newKey) => setSearchKey(newKey as SearchKey)}
                    onTextChange={(text) => setSearchText(text)}
                    keyValue={searchState.key}
                    textValue={searchState.text}
                    searchKeys={searchKeys}
                    label={null}
                />
                <h2 className="text-gray-500 font-semibold text-xl">
                    {searchedCreations.length} Creations
                </h2>
            </nav>
            <ExerciseList exercises={searchedCreations} exercisePerPage={5} />
        </ProfileSectionContainer>
    );
};

export default MyCreations;
