import React from 'react';
import { IExerciseWithId } from '../../models/interfaces';
import RoundButton from '../ui/buttons/RoundButton';

interface Props {
    showCreatedExercises: boolean;
    setShowCreatedExercises: React.Dispatch<React.SetStateAction<boolean>>;
    selectedExercises: IExerciseWithId[];
}

const ShowcaseListOptions: React.FC<Props> = (props) => {
    const { showCreatedExercises, setShowCreatedExercises, selectedExercises } = props;

    return (
        <div className="my-3 flex flex-wrap justify-between items-center gap-3">
            <div className="flex gap-3">
                <RoundButton
                    onClick={() => setShowCreatedExercises(true)}
                    className="!text-base !shadow-md hover:shadow-lg"
                    theme={showCreatedExercises ? 'dark' : 'light'}
                >
                    Created Ones
                </RoundButton>
                <RoundButton
                    onClick={() => setShowCreatedExercises(false)}
                    className="!text-base !shadow-md hover:shadow-lg"
                    theme={!showCreatedExercises ? 'dark' : 'light'}
                >
                    Solved Ones
                </RoundButton>
            </div>
            <h3 className="text-xl text-gray-500 font-semibold">
                {selectedExercises.length}
                &nbsp;{showCreatedExercises ? 'Created' : 'Solved'}
                &nbsp;Challenges
            </h3>
        </div>
    );
};

export default ShowcaseListOptions;
