import React from 'react';
import { CreationSection, DifficultyList, LanguageList } from '../../../models/enums';
import { ProgrammingTopicList } from '../../../models/enums/ProgrammingTopic';
import CustomSelect from '../../ui/inputs/CustomSelect';
import CreationSectionContainer from '../containers/CreationSectionContainer';

const ChallengeSettings: React.FC = () => {
    return (
        <CreationSectionContainer title="Settings" id={CreationSection.SETTINGS}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[7.5%] gap-y-[10%]">
                <CustomSelect
                    id="difficulty"
                    labelText="Difficulty:"
                    options={DifficultyList}
                />
                <CustomSelect id="language" labelText="Language:" options={LanguageList} />
                <CustomSelect id="topic" labelText="Topic:" options={ProgrammingTopicList} />
            </div>
        </CreationSectionContainer>
    );
};

export default ChallengeSettings;
