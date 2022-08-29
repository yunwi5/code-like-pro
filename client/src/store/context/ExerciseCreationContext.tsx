import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
    CreationSection,
    Difficulty,
    Language,
    ProgrammingTopic,
    ToastType,
} from '../../models/enums';
import { IExercise, ITestCase } from '../../models/interfaces';
import { getInitialTestCaseArray } from '../../utils/exercise-creation-utils/testcase-utils';
import { toastNotify } from '../../utils/notification/toast';
import { sleep } from '../../utils/promise';

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
    saveExercise: () => void;
    isLoading: boolean;
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

export const DRAFT_LOCAL_STORATE_KEY = 'exercise_creation_draft';

// Context for sharing and storing user exercise creation data.
// Each exercise creation related component can use this context to receive or update the data.
export const ExerciseCreationContextProvider: React.FC<Props> = ({ children }) => {
    const [exerciseDraft, setExerciseDraft] = useLocalStorage<IExercise | ''>(
        DRAFT_LOCAL_STORATE_KEY,
        '',
    );

    const [name, setName] = useState('');
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState<Language>(Language.C);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
    const [topic, setTopic] = useState<ProgrammingTopic>(ProgrammingTopic.ARRAY);

    const [solutionCode, setSolutionCode] = useState('');
    const [startingTemplate, setStartingTemplate] = useState('');

    const [tags, setTags] = useState<string[]>([]);
    const [testCases, setTestCases] = useState<ITestCase[]>(() => getInitialTestCaseArray());

    const [activeSection, setActiveSection] = useState<CreationSection | null>(null);

    // State for loading while sending a request to the server. Loading state should not let users to click 'Run Code' or 'Save Challenge' buttons.
    // Show some loading spinners while loading.
    const [isLoading, setIsLoading] = useState(false);

    // Send POST request to the server.
    const saveExercise = async () => {
        const exercise = createExerciseObject();
        setIsLoading(true);
        await sleep(2000);
        setIsLoading(false);
    };

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
        toastNotify('Saved Draft Locally!', ToastType.SUCCESS);
    };

    console.log('isLoading:', isLoading);

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
        saveExercise,
        isLoading,
    };

    return (
        <ExerciseCreationContext.Provider value={value}>
            {children}
        </ExerciseCreationContext.Provider>
    );
};
