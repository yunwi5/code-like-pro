import React from 'react';
import { SortingDirection, SortingDirectionList } from '../../../models/enums';
import CustomSelect from './CustomSelect';

interface Props {
    sortingKeys: string[] | readonly string[];
    onKeyChange: (newKey: string) => void;
    onDirectionChange: (newDir: SortingDirection) => void;
    sortingKey: string;
    direction: SortingDirection;
}

// Helper component to support sorting functionality
// First input for selecting sorting key, second input for sorting direction.
const Sortingbar: React.FC<Props> = (props) => {
    const { sortingKeys, onKeyChange, sortingKey, onDirectionChange, direction } = props;

    return (
        <div className="flex-start gap-2">
            <CustomSelect
                className="flex-1 gap-0"
                labelText={<span className="font-semibold">Sort By</span>}
                options={sortingKeys}
                onChange={onKeyChange}
                value={sortingKey}
                id="sorting-key"
            />
            <CustomSelect
                className="flex-1 gap-0"
                labelText={<span className="font-semibold">Direction</span>}
                options={SortingDirectionList}
                value={direction}
                onChange={(newDir) => onDirectionChange(newDir as SortingDirection)}
                id="sorting-direction"
            />
        </div>
    );
};

export default Sortingbar;
