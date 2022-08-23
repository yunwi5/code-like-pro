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
    addTestCase: () => void;
    updateTestCase: (props: ITestCaseProps, index: number) => void;
    deleteTestCase: (index: number) => void;
}

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({
    testCases: [],
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
    const [testCases, setTestCases] = useState<ITestCase[]>(getInitialTestCaseArray());

    const addTestCase = () => setTestCases((prevList) => [...prevList, getEmptyTestCase()]);

    const updateTestCase = (props: ITestCaseProps, index: number) => {
        const newList = [...testCases];
        newList[index] = { ...newList[index], ...props };
        setTestCases(newList);
    };

    const deleteTestCase = (targetIndex: number) => {
        setTestCases((prevList) => prevList.filter((test, idx) => idx !== targetIndex));
    };

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
        addTestCase,
        updateTestCase,
        deleteTestCase,
    };

    return (
        <ExerciseCreationContext.Provider value={value}>
            {children}
        </ExerciseCreationContext.Provider>
    );
};
