'use client';
import { motion } from 'framer-motion';

import useExerciseSearch from '../../../hooks/useExerciseSearch';
import { SearchKey, SearchKeyList } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { mapExercisesToExerciseCards } from '../../../utils/exercise-utils/exercise';
import Searchbar from '../../ui/inputs/Searchbar';
import ExerciseList from '../../ui/lists/ExerciseList';
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

  if (!userDetail?.exercises) return <ProfileLoader />;

  const handleSearch = (searchKey: string, text: string) => {
    setSearchKey(searchKey as SearchKey);
    setSearchText(text);
  };

  return (
    <ProfileSectionContainer>
      <motion.nav
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-y-4 mb-6"
      >
        <Searchbar
          defaultSearchKey={searchState.key}
          searchKeys={searchKeys}
          label={null}
          onSearch={handleSearch}
        />
        <h2 className="text-gray-500 font-semibold text-xl">
          {searchedCreations.length} Creations
        </h2>
      </motion.nav>
      <ExerciseList exercises={searchedCreations} exercisePerPage={5} />
    </ProfileSectionContainer>
  );
};

export default MyCreations;
