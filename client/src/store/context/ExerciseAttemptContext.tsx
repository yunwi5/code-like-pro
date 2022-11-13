import React, { useContext, useEffect, useState } from 'react';
import { postSubmission, runTestCases } from '../../apis/submission.api';
import ShowcaseInviteModal from '../../components/exercise-attempt/modals/ShowcaseInviteModal';
import useBadgeQualification from '../../hooks/badges/useBadgeQualification';
import {
    IExerciseWithId,
    ITestCase,
    ITestOutput,
    IUserSubmission,
} from '../../models/interfaces';
import { getCorrectTestCaseCount } from '../../utils/exercise-utils/testcase';
import { toastNotify } from '../../utils/notification';

interface IExerciseAttemptCtx {
    exercise: IExerciseWithId | null;
    isLoading: boolean;
    testCaseOutputs: ITestOutput[];
    userSolution: string;
    userSubmission: IUserSubmission | null;
    setUserSolution: React.Dispatch<React.SetStateAction<string>>;
    runCode: () => void;
    submitCode: () => void;
    refetchExercise: () => void;
    customTests: ITestCase[];
    setCustomTests: React.Dispatch<React.SetStateAction<ITestCase[]>>;
}

export const useExerciseAttemptCtx = () => useContext(ExerciseAttemptContext);

interface Props {
    children: React.ReactNode;
    refetchExercise: () => void;
    exercise: IExerciseWithId;
    userSubmission?: IUserSubmission;
}

export const ExerciseAttemptCtxProvider: React.FC<Props> = ({
    exercise,
    userSubmission: previousSubmission,
    refetchExercise,
    children,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userSolution, setUserSolution] = useState(exercise.startingTemplate);
    const [userSubmission, setUserSubmission] = useState<IUserSubmission | null>(
        previousSubmission ?? null,
    );
    const [testCaseOutputs, setTestCaseOutputs] = useState<ITestOutput[]>([]);

    const [customTests, setCustomTests] = useState<ITestCase[]>([]);

    // Solving badge qualifying detection
    const { qualifySolvingBadges } = useBadgeQualification();
    // Showcase invite modal to encourage users to join the showcase, after they get correct.
    const [showInviteModal, setShowInviteModal] = useState(false);

    const runCode = async () => {
        // output of the test cases => actual output, status like correctness
        setIsLoading(true);

        // Test cases combining custom tests by user and original tests by creator
        const testCases = customTests.concat(exercise.testCases);

        const {
            ok,
            data: outputs,
            message,
        } = await runTestCases({
            code: userSolution,
            testCases,
            language: exercise.language,
        });
        setIsLoading(false);

        if (ok && outputs) {
            setTestCaseOutputs(outputs);
            const { correct } = getCorrectTestCaseCount(outputs);
            setCustomTests((tests) =>
                tests.map((test) => ({ ...test, hasOutput: true })),
            );
            toastNotify(
                `You got ${correct} tests correct out of ${outputs.length} tests!`,
            );
        } else toastNotify(`Oops, ${message}`, 'error');
    };

    const submitCode = async () => {
        setIsLoading(true);
        const {
            ok,
            data: newSubmission,
            message,
        } = await postSubmission(exercise._id, { code: userSolution });
        setIsLoading(false);

        if (ok && newSubmission) {
            setUserSubmission(newSubmission);
            if (newSubmission.correct) {
                toastNotify("You got all creator's test cases correct!", 'success');
                setShowInviteModal(true);
            } else {
                toastNotify(
                    `Submission status is incorrect. Debug your code and try again!`,
                );
            }
        } else {
            toastNotify(`Oops, ${message}`, 'error');
        }
    };

    useEffect(() => {
        if (!previousSubmission) return;
        setUserSubmission(previousSubmission);
        setUserSolution(previousSubmission.code);
    }, [previousSubmission]);

    useEffect(() => {
        qualifySolvingBadges();
    }, [userSubmission, qualifySolvingBadges]);

    const value = {
        exercise,
        testCaseOutputs,
        isLoading,
        userSolution,
        userSubmission,
        setUserSolution,
        runCode,
        submitCode,
        refetchExercise,
        customTests,
        setCustomTests,
    };

    return (
        <ExerciseAttemptContext.Provider value={value}>
            {children}
            <ShowcaseInviteModal
                open={showInviteModal}
                onClose={() => setShowInviteModal(false)}
            ></ShowcaseInviteModal>
        </ExerciseAttemptContext.Provider>
    );
};

const ExerciseAttemptContext = React.createContext<IExerciseAttemptCtx>({
    exercise: null,
    isLoading: false,
    testCaseOutputs: [],
    userSolution: '',
    userSubmission: null,
    setUserSolution: () => {},
    runCode: () => {},
    submitCode: () => {},
    refetchExercise: () => {},
    customTests: [],
    setCustomTests: () => {},
});
