import React, { useContext, useState } from 'react';
import { Difficulty, Language, ProgrammingTopic } from '../../models/enums';
import { ITestCase, ITestCaseProps } from '../../models/interfaces';
import {
    getEmptyTestCase,
    getInitialTestCaseArray,
} from '../../utils/exercise-creation-utils/testcase-utils';

interface IExerciseCreationContext {
    name: string;
    setName: (name: string) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    topic: ProgrammingTopic;
    setTopic: (topic: ProgrammingTopic) => void;
    prompt: string;
    difficulty: Difficulty;
    setDifficulty: (diff: Difficulty) => void;
    setPrompt: (text: string) => void;
    testCases: ITestCase[];
    setTestCases: React.Dispatch<React.SetStateAction<ITestCase[]>>;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    startingTemplate: string;
    setStartingTemplate: React.Dispatch<React.SetStateAction<string>>;
    solutionCode: string;
    setSolutionCode: React.Dispatch<React.SetStateAction<string>>;
}

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({
    testCases: [],
    tags: [],
} as any);

export const useExerciseCreationContext = () => useContext(ExerciseCreationContext);

interface Props {
    children: React.ReactNode;
}

export const ExerciseCreationContextProvider: React.FC<Props> = ({ children }) => {
    const [name, setName] = useState('');
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState<Language>(Language.C);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
    const [topic, setTopic] = useState<ProgrammingTopic>(ProgrammingTopic.ARRAY);

    const [solutionCode, setSolutionCode] = useState('');
    const [startingTemplate, setStartingTemplate] = useState('');

    const [tags, setTags] = useState<string[]>([]);
    const [testCases, setTestCases] = useState<ITestCase[]>(getInitialTestCaseArray());

    const runTestCases = () => {};
    const saveExercise = () => {};

    const value = {
        name,
        setName,
        language,
        setLanguage,
        topic,
        setTopic,
        difficulty,
        setDifficulty,
        prompt,
        setPrompt,
        testCases,
        setTestCases,
        tags,
        setTags,
        startingTemplate,
        setStartingTemplate,
        solutionCode,
        setSolutionCode,
    };

    return (
        <ExerciseCreationContext.Provider value={value}>
            {children}
        </ExerciseCreationContext.Provider>
    );
};
