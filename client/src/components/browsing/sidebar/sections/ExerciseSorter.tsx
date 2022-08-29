import React from 'react';
import { SortingDirectionList, SortingKeyList } from '../../../../models/enums';
import CustomSelect from '../../../ui/inputs/CustomSelect';

const ExerciseSorter = () => {
    return (
        <div className="flex-start gap-2">
            <CustomSelect
                className="flex-1 gap-1"
                labelText={<span className="font-semibold">Sort By</span>}
                options={['None', ...SortingKeyList]}
                id="sorting-standard"
            />
            <CustomSelect
                className="flex-1 gap-1"
                labelText={<span className="font-semibold">Direction</span>}
                options={SortingDirectionList}
                id="sorting-standard"
            />
        </div>
    );
};

export default ExerciseSorter;
