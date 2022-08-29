import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postExercise, putExercise } from '../../apis/exercise-apis/exercise';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Difficulty, Language, ProgrammingTopic, ToastType } from '../../models/enums';
import { IExercise, IExerciseWithId, ITestCase } from '../../models/interfaces';
import { getInitialTestCaseArray } from '../../utils/exercise-creation-utils/testcase-utils';
import { mapLanguageToJobeLangCode } from '../../utils/language';
import { toastNotify } from '../../utils/notification/toast';

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
    saveDraft: () => void;
    saveExercise: () => void;
    isLoading: boolean;
    redirectToCreatedExercisePage: Function;
    createdExercise: null | IExercise;
    // activeSection: CreationSection | null;
    // setActiveSection: React.Dispatch<React.SetStateAction<CreationSection | null>>;
}

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({
    setActiveSection: () => {},
    setName: () => {},
    redirectToCreatedExercisePage: () => {},
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
    const navigate = useNavigate();
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

    // const [activeSection, stActiveSection] = useState<CreationSection | null>(null);

    // State for loading while sending a request to the server. Loading state should not let users to click 'Run Code' or 'Save Challenge' buttons.
    // Show some loading spinners while loading.
    const [isLoading, setIsLoading] = useState(false);

    // Boolean value indicating whether the user submission was saved to the server successfully.
    const [createdExercise, setCreatedExercise] = useState<null | IExerciseWithId>(null);

    // Send POST request to the server.
    const saveExercise = async () => {
        const exercise = createExerciseObject();

        // Get jobe language code.
        exercise.language = mapLanguageToJobeLangCode(language) as any;

        setIsLoading(true);
        // If the exercise already exists, send PUT request, otherwise send POST request.
        // Returned data would be the same.
        const { ok, data, message } = createdExercise
            ? await putExercise(createdExercise._id, exercise)
            : await postExercise(exercise);

        if (ok) {
            toastNotify('Challenge was saved successfully!', ToastType.SUCCESS);
            setCreatedExercise(data);
        } else {
            toastNotify(message, ToastType.ERROR);
        }
        setIsLoading(false);
    };

    const redirectToCreatedExercisePage = () => {
        if (!createdExercise || !createdExercise._id) {
            return;
        }
        navigate(`/exercise/${createdExercise._id}`);
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

    // Runs on mount.
    useEffect(() => {
        if (!exerciseDraft) return;
        setLanguage(exerciseDraft.language as Language);
        setTopic(exerciseDraft.topic);
        setDifficulty(exerciseDraft.difficulty);
        setTags(exerciseDraft.tags);
        setPrompt(exerciseDraft.prompt);
        setTestCases(exerciseDraft.testCases);
        setStartingTemplate(exerciseDraft.startingTemplate);
        setSolutionCode(exerciseDraft.solutionCode);
        setName(exerciseDraft.name);
    }, [exerciseDraft]);

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
        saveDraft,
        saveExercise,
        isLoading,
        createdExercise,
        redirectToCreatedExercisePage,
    };

    return (
        <ExerciseCreationContext.Provider value={value}>
            {children}
        </ExerciseCreationContext.Provider>
    );
};
