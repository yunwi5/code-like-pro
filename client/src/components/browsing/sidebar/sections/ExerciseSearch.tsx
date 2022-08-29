import React, { useState } from 'react';
import { SearchKeyList } from '../../../../models/enums';
import { browsingActions, ISearchingState } from '../../../../store/redux/browsing-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import Searchbar from '../../../ui/inputs/Searchbar';

// The functionality needs to be implemented.
const ExerciseSearch: React.FC = () => {
    const { key, text } = useAppSelector((state) => state.browsing.searching);
    const [localSearchingState, setLocalSearchingState] = useState<ISearchingState>({
        key,
        text,
    });

    const dispatch = useAppDispatch();

    const handleSearch = () => {
        console.log('Submit search!');
        dispatch(browsingActions.setSearching({ ...localSearchingState }));
    };

    return (
        <Searchbar
            searchKeys={SearchKeyList}
            keyValue={localSearchingState.key}
            onKeyChange={(newKey: string) =>
                setLocalSearchingState((prev) => ({ ...prev, key: newKey as any }))
            }
            textValue={localSearchingState.text}
            onTextChange={(newText: string) =>
                setLocalSearchingState((prev) => ({ ...prev, text: newText }))
            }
            onSearch={handleSearch}
        />
    );
};

export default ExerciseSearch;
