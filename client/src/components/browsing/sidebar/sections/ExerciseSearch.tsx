import React from 'react';
import { SearchKeyList } from '../../../../models/enums';
import Searchbar from '../../../ui/inputs/Searchbar';

// The functionality needs to be implemented.
const ExerciseSearch: React.FC = () => {
    return <Searchbar searchKeys={SearchKeyList} />;
};

export default ExerciseSearch;
