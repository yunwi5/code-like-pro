import React from 'react';
import { CreationSection } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const CreationName: React.FC = () => {
    const { name, setName } = useExerciseCreationContext();
    return (
        <CreationSectionContainer
            id={CreationSection.CHALLENGE_NAME}
            title={<label htmlFor="challenge-name">Challenge Name</label>}
        >
            <input
                id="challenge-name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="Enter your challenge name"
                className="px-2 py-2 border-2 border-gray-300  rounded-sm shadow-md"
            />
        </CreationSectionContainer>
    );
};

export default CreationName;
