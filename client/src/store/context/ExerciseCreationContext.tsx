import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CreationSection, Difficulty, Language, ProgrammingTopic } from '../../models/enums';
import { IExercise, ITestCase } from '../../models/interfaces';
import { getInitialTestCaseArray } from '../../utils/exercise-creation-utils/testcase-utils';

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
    activeSection: CreationSection | null;
    setActiveSection: React.Dispatch<React.SetStateAction<CreationSection | null>>;
    saveDraft: () => void;
}

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({
    setActiveSection: () => {},
    setName: () => {},
    testCases: [],
    tags: [],
} as any);

export const useExerciseCreationContext = () => useContext(ExerciseCreationContext);

interface Props {
    children: React.ReactNode;
}

const LOCAL_STORATE_KEY = 'exercise_creation_draft';

// Context for sharing and storing user exercise creation data.
// Each exercise creation related component can use this context to receive or update the data.
export const ExerciseCreationContextProvider: React.FC<Props> = ({ children }) => {
    const [exerciseDraft, setExerciseDraft] = useLocalStorage<IExercise | ''>(
        LOCAL_STORATE_KEY,
        '',
    );

    const [name, setName] = useState('');
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState<Language>(Language.C);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
    const [topic, setTopic] = useState<ProgrammingTopic>(ProgrammingTopic.ARRAY);

    const [solutionCode, setSolutionCode] = useState('');
    const [startingTemplate, setStartingTemplate] = useState('');

    const [activeSection, setActiveSection] = useState<CreationSection | null>(null);

    const [tags, setTags] = useState<string[]>([]);
    const [testCases, setTestCases] = useState<ITestCase[]>(() => getInitialTestCaseArray());

    // const runTestCases = () => {};
    // const saveExercise = () => {};

    const createExerciseObject = () => ({
        name,
        language,
        difficulty,
        topic,
        prompt,
        solutionCode,
        startingTemplate,
        tags,
        // Remove id and error from test cases.
        testCases: testCases.map((testCase) => ({
            ...testCase,
            id: undefined,
            error: undefined,
        })),
    });

    // Save currently unsaved work on exercise creation so that users do not lose their intermediate process.
    // Svae the work in localStorage for now.
    const saveDraft = () => {
        setExerciseDraft(createExerciseObject());
    };

    // Runs on mount.
    useEffect(() => {
        if (!exerciseDraft) return;
        setLanguage(exerciseDraft.language);
        setTopic(exerciseDraft.topic);
        setDifficulty(exerciseDraft.difficulty);
        setTags(exerciseDraft.tags);
        setPrompt(exerciseDraft.prompt);
        setTestCases(exerciseDraft.testCases);
        setStartingTemplate(exerciseDraft.startingTemplate);
        setSolutionCode(exerciseDraft.solutionCode);
        setName(exerciseDraft.name);
    }, []);

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
        activeSection,
        setActiveSection,
        saveDraft,
    };

    return (
        <ExerciseCreationContext.Provider value={value}>
            {children}
        </ExerciseCreationContext.Provider>
    );
};
