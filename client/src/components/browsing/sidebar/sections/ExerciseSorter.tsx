import React from 'react';
import { SortingDirectionList, ExerciseSortingKeyList } from '../../../../models/enums';
import { browsingActions } from '../../../../store/redux/browsing-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/redux/store';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const ExerciseSorter = () => {
    const { key, direction } = useAppSelector((state) => state.browsing.sorting);
    const dispatch = useAppDispatch();

    const handleKeyChange = (newKey: string) =>
        dispatch(browsingActions.setSorting({ key: newKey as any, direction }));

    const handleDirectionChange = (dir: string) =>
        dispatch(browsingActions.setSorting({ key, direction: dir as any }));

    return (
        <div className="flex-start gap-1">
            <CustomSelect
                className="flex-1 gap-1"
                labelText={<span className="font-semibold">Sort By</span>}
                options={ExerciseSortingKeyList}
                onChange={handleKeyChange}
                value={key}
                id="sorting-key"
            />
            <CustomSelect
                className="flex-1 gap-1"
                labelText={<span className="font-semibold">Direction</span>}
                options={SortingDirectionList}
                value={direction}
                onChange={handleDirectionChange}
                id="sorting-direction"
            />
        </div>
    );
};

export default ExerciseSorter;
