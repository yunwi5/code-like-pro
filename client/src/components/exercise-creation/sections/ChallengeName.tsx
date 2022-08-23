import React from 'react';
import { CreationSection } from '../../../models/enums';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeName: React.FC = () => {
    return (
        <CreationSectionContainer
            id={CreationSection.CHALLENGE_NAME}
            title={<label htmlFor="challenge-name">Challenge Name</label>}
        >
            <input
                id="challenge-name"
                placeholder="Enter your challenge name"
                className="px-2 py-2 border-2 border-gray-300  rounded-sm shadow-md"
            />
        </CreationSectionContainer>
    );
};

export default ChallengeName;
