import React from 'react';
import {
    CreationSection,
    Difficulty,
    DifficultyList,
    Language,
    LanguageList,
} from '../../../models/enums';
import { ProgrammingTopicList } from '../../../models/enums/ProgrammingTopic';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { languageCodesToReadableNames } from '../../../utils/language';
import CustomSelect from '../../ui/inputs/CustomSelect';
import CreationSectionContainer from '../containers/CreationSectionContainer';
import ChallengeTags from './ChallengeTags';

const ChallengeSettings: React.FC = () => {
    const { language, setLanguage, difficulty, setDifficulty, topic, setTopic } =
        useExerciseCreationContext();

    return (
        <CreationSectionContainer title="Settings" id={CreationSection.SETTINGS}>
            <div className="mb-14 md:mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[7.5%] gap-y-[10%]">
                <CustomSelect
                    id="difficulty"
                    value={difficulty}
                    onChange={(diff: string) => setDifficulty(diff as Difficulty)}
                    labelText="Difficulty:"
                    options={DifficultyList}
                />
                <CustomSelect
                    value={language}
                    onChange={(lang: string) => setLanguage(lang as Language)}
                    id="language"
                    labelText="Language:"
                    options={LanguageList}
                    optionLabels={languageCodesToReadableNames(LanguageList)}
                />
                <CustomSelect
                    onChange={(top: string) => setTopic(top as any)}
                    value={topic}
                    id="topic"
                    labelText="Topic:"
                    options={ProgrammingTopicList}
                />
            </div>
            <ChallengeTags />
        </CreationSectionContainer>
    );
};

export default ChallengeSettings;
