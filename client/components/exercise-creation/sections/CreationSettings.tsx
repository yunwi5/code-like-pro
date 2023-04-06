import React from 'react';
import {
    CreationSection,
    Difficulty,
    DifficultyList,
    Language,
    LanguageList,
} from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { prettierLanguageNames } from '../../../utils/language';
import CustomSelect from '../../ui/inputs/CustomSelect';
import CreationSectionContainer from '../containers/CreationSectionContainer';
import CreationTags from './CreationTags';

const CreationSettings: React.FC = () => {
    const { language, setLanguage, difficulty, setDifficulty } =
        useExerciseCreationContext();

    return (
        <CreationSectionContainer title="Settings" id={CreationSection.SETTINGS}>
            <div className="mb-14 md:mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-[7.5%] gap-y-[10%]">
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
                    optionLabels={prettierLanguageNames(LanguageList)}
                />
            </div>
            <CreationTags />
        </CreationSectionContainer>
    );
};

export default CreationSettings;
