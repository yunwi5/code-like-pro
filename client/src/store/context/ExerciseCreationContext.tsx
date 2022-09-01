import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postExercise, putExercise } from '../../apis/exercise';
import { runTestCases } from '../../apis/submission';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
    CreationSection,
    Difficulty,
    Language,
    ProgrammingTopic,
    ToastType,
} from '../../models/enums';
import {
    IExercise,
    IExerciseCreationContext,
    IExerciseWithId,
    IReadyStatus,
    ITestCase,
    ITestResult,
} from '../../models/interfaces';
import { getInitialTestCaseArray } from '../../utils/exercise-creation-utils/testcase-utils';
import { mapLanguageToJobeLangCode } from '../../utils/language';
import { toastNotify } from '../../utils/notification/toast';

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({
    setActiveSection: () => {},
    setName: () => {},
    redirectToCreatedExercisePage: () => {},
    runCode: () => {},
    testCases: [],
    tags: [],
} as any);

export const useExerciseCreationContext = () => useContext(ExerciseCreationContext);

export const DRAFT_LOCAL_STORATE_KEY = 'exercise_creation_draft';

// Context for sharing and storing user exercise creation data.
// Each exercise creation related component can use this context to receive or update the data.
export const ExerciseCreationContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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
    const [testCaseOutputs, setTestCaseOutputs] = useState<ITestResult[]>([]);

    const [activeSection, setActiveSection] = useState<CreationSection | null>(null);

    // State for loading while sending a request to the server. Loading state should not let users to click 'Run Code' or 'Save Challenge' buttons.
    // Show some loading spinners while loading.
    const [isLoading, setIsLoading] = useState(false);

    // Check whether the user is ready to post the exercise or not.
    const [readyStatus, setReadyStatus] = useState<IReadyStatus | null>(null);

    // Boolean value indicating whether the user submission was saved to the server successfully.
    const [createdExercise, setCreatedExercise] = useState<null | IExerciseWithId>(null);

    // Save currently unsaved work on exercise creation so that users do not lose their intermediate process.
    // Svae the work in localStorage for now.
    const saveDraft = () => {
        setExerciseDraft(createExerciseObject());
        toastNotify('Saved Draft Locally!', ToastType.SUCCESS);
    };

    const runCode = async () => {
        setIsLoading(true);
        const {
            ok,
            data: testCasesResult,
            message,
        } = await runTestCases({
            code: solutionCode,
            testCases,
            language: mapLanguageToJobeLangCode(language),
        });
        setIsLoading(false);

        if (ok && testCasesResult) {
            const everythingCorrect = testCasesResult.every((testCase) => testCase.correct);
            if (everythingCorrect) {
                toastNotify('You passed all tests! Ready to submit.', ToastType.SUCCESS);
                setReadyStatus({
                    status: 'success',
                    message: 'You are ready to post your exercise!',
                });
            } else {
                toastNotify('You failed some tests...', ToastType.ERROR);
                setReadyStatus({
                    status: 'error',
                    message: 'Please get all test cases right before posting!',
                });
            }
            setTestCaseOutputs(testCasesResult);
        } else {
            console.log('Error on run code:', message);
            toastNotify('Oops, something went wrong on the server.', ToastType.ERROR);
        }
    };

    // Send POST request to the server.
    const saveExercise = async () => {
        // Check if they run the test cases before posting
        if (readyStatus == null) {
            setReadyStatus({ status: 'error', message: 'Please run your code first!' });
            return;
        } else if (readyStatus?.status === 'error') {
            setReadyStatus({
                status: 'error',
                message: 'Please pass all the test cases first!',
            });
            return;
        }

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
            if (data) setCreatedExercise(data);
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
        activeSection,
        setActiveSection,
        runCode,
        testCaseOutputs,
        readyStatus,
    };

    return (
        <ExerciseCreationContext.Provider value={value}>
            {children}
        </ExerciseCreationContext.Provider>
    );
};
