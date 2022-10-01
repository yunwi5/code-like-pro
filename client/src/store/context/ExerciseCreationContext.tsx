import React, { useContext, useEffect, useState } from 'react';
import { postExercise, putExercise } from '../../apis/exercise';
import { runTestCases } from '../../apis/submission.api';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CreationSection, Difficulty, Language } from '../../models/enums';
import {
    IExercise,
    IExerciseCreationContext,
    IExerciseWithId,
    IReadyStatus,
    ITestCase,
    ITestOutput,
} from '../../models/interfaces';
import {
    analyzeTestCasesResult,
    getInitialTestCaseArray,
} from '../../utils/exercise-utils/testcase';
import { toastNotify } from '../../utils/notification';

export const ExerciseCreationContext = React.createContext<IExerciseCreationContext>({
    setActiveSection: () => {},
    setName: () => {},
    runCode: () => {},
    testCases: [],
    tags: [],
    courses: [],
} as any);

export const useExerciseCreationContext = () => useContext(ExerciseCreationContext);

export const DRAFT_LOCAL_STORATE_KEY = 'exercise_creation_draft';

interface Props {
    children: React.ReactNode;
    exercise?: IExerciseWithId; // initial exercise (if in edit mode)
}

// Context for sharing and storing user exercise creation data.
// Each exercise creation related component can use this context to receive or update the data.
export const ExerciseCreationContextProvider: React.FC<Props> = ({
    children,
    exercise,
}) => {
    // Construct a unique key for the exercise draft so that exercise drafts do not conlict each other.
    const draftKey = `${DRAFT_LOCAL_STORATE_KEY}${exercise ? `-${exercise._id}` : ''}`;
    const [exerciseDraft, setExerciseDraft] = useLocalStorage<IExercise | ''>(
        draftKey,
        '',
    );

    const [name, setName] = useState(exercise?.name || '');
    const [prompt, setPrompt] = useState(exercise?.prompt || '');
    const [language, setLanguage] = useState<Language>(exercise?.language || Language.C);
    const [difficulty, setDifficulty] = useState<Difficulty>(
        exercise?.difficulty || Difficulty.EASY,
    );

    const [solutionCode, setSolutionCode] = useState(exercise?.solutionCode || '');
    const [startingTemplate, setStartingTemplate] = useState(
        exercise?.startingTemplate || '',
    );

    const [tags, setTags] = useState<string[]>(exercise?.tags || []);
    const [courses, setCourses] = useState<string[]>(exercise?.courses || []);

    const [testCases, setTestCases] = useState<ITestCase[]>(
        exercise?.testCases || getInitialTestCaseArray(),
    );
    const [testCaseOutputs, setTestCaseOutputs] = useState<ITestOutput[]>([]);

    const [createdExercise, setCreatedExercise] = useState<null | IExerciseWithId>(
        exercise ?? null,
    );

    // State for loading while sending a request to the server. Loading state should not let users to click 'Run Code' or 'Save Challenge' buttons.
    // Show some loading spinners while loading.
    const [isLoading, setIsLoading] = useState(false);

    // Check whether the user is ready to post the exercise or not.
    const [readyStatus, setReadyStatus] = useState<IReadyStatus | null>(null);

    const [activeSection, setActiveSection] = useState<CreationSection | null>(null);

    const createExerciseObject = () => ({
        name,
        language,
        difficulty,
        prompt,
        solutionCode,
        startingTemplate,
        tags,
        courses,
        // Remove id and error from test cases.
        testCases: testCases.map((testCase) => ({
            ...testCase,
            _id: undefined,
            error: undefined,
        })),
    });

    // Save currently unsaved work on exercise creation so that users do not lose their intermediate process.
    const saveDraft = () => {
        if (createdExercise == null) {
            setExerciseDraft(createExerciseObject());
            toastNotify('Saved Draft Locally!', 'success');
        }
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
            language: language,
        });
        setIsLoading(false);

        if (ok && testCasesResult) {
            const { status, message } = analyzeTestCasesResult(
                testCases,
                testCasesResult,
            );

            if (status === 'error') {
                toastNotify(message, 'error');
                setReadyStatus({ status: 'error', message });
            } else {
                toastNotify(message, 'success');
                setReadyStatus({ status: 'success', message });
            }
            setTestCaseOutputs(testCasesResult);
        } else {
            console.log('Error on run code:', message);
            toastNotify('Oops, something went wrong on the server.', 'error');
        }
    };

    // Send POST request to the server.
    const saveExercise = async () => {
        // Check if they run the test cases before posting
        if (createdExercise == null && readyStatus == null) {
            setReadyStatus({ status: 'error', message: 'Please run your code first!' });
            return;
        } else if (readyStatus?.status === 'error') {
            setReadyStatus({
                status: 'error',
                message: 'Please pass all the test cases first!',
            });
            return;
        }

        const exercise: any = createExerciseObject();

        setIsLoading(true);
        // If the exercise already exists, send PUT request, otherwise send POST request.
        // Returned data would be the same.
        const { ok, data, message } = createdExercise
            ? await putExercise(createdExercise._id, exercise)
            : await postExercise(exercise);

        if (ok) {
            toastNotify('Challenge was saved successfully!', 'success');
            if (data) setCreatedExercise(data);
            setExerciseDraft('');
        } else {
            toastNotify(message || 'Something went wrong...', 'error');
        }
        setIsLoading(false);
    };

    // Runs on mount.
    useEffect(() => {
        // If there is no draft initially, return.
        if (!exerciseDraft) return;
        // If there is an initial exercise (edit mode), do not use the draft data.
        if (exercise) return;
        setName(exerciseDraft.name);
        setLanguage(exerciseDraft.language as Language);
        setDifficulty(exerciseDraft.difficulty);
        setTags(exerciseDraft.tags);
        setCourses(exerciseDraft.courses || []);
        setPrompt(exerciseDraft.prompt);
        setTestCases(exerciseDraft.testCases);
        setStartingTemplate(exerciseDraft.startingTemplate);
        setSolutionCode(exerciseDraft.solutionCode);
    }, [exerciseDraft]);

    const value = {
        name,
        setName,
        language,
        setLanguage,
        difficulty,
        setDifficulty,
        prompt,
        setPrompt,
        testCases,
        setTestCases,
        tags,
        setTags,
        courses,
        setCourses,
        startingTemplate,
        setStartingTemplate,
        solutionCode,
        setSolutionCode,
        saveDraft,
        saveExercise,
        isLoading,
        createdExercise,
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
