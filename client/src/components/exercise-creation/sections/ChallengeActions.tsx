import React from 'react';
import Button from '../../ui/buttons/Button';

const btnClass = 'min-w-[10rem]';

const ChallengeActions: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-between">
            <Button className={btnClass}>Run Code</Button>
            <Button className={btnClass}>Save Changes</Button>
            <Button className={btnClass}>See Result</Button>
        </div>
    );
};

export default ChallengeActions;
