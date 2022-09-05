import React, { useContext, useState } from 'react';
import { postSubmission, runTestCases } from '../../apis/submission';
import ShowcaseInviteModal from '../../components/exercise-attempt/modals/ShowcaseInviteModal';
import { ToastType } from '../../models/enums';
import { IExerciseWithId, ITestResult, IUserSubmission } from '../../models/interfaces';
import { getCorrectTestCaseCount } from '../../utils/exercise-utils/testcase';
import { mapLanguageToJobeLangCode } from '../../utils/language';
import { toastNotify } from '../../utils/notification';

interface IExerciseAttemptCtx {
    exercise: IExerciseWithId | null;
    isLoading: boolean;
    testCaseOutputs: ITestResult[];
    userSolution: string;
    userSubmission: IUserSubmission | null;
    setUserSolution: React.Dispatch<React.SetStateAction<string>>;
    runCode: () => void;
    submitCode: () => void;
    refetchExercise: () => void;
}

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
});

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
    const [testCaseOutputs, setTestCaseOutputs] = useState<ITestResult[]>([]);

    // Showcase invite modal to encourage users to join the showcase, after they get correct.
    const [showInviteModal, setShowInviteModal] = useState(false);

    const runCode = async () => {
        // output of the test cases => actual output, status like correctness
        setIsLoading(true);
        const {
            ok,
            data: outputs,
            message,
        } = await runTestCases({
            code: userSolution,
            testCases: exercise.testCases,
            language: mapLanguageToJobeLangCode(exercise.language),
        });
        setIsLoading(false);

        console.log('outputs:', outputs);

        if (ok && outputs) {
            setTestCaseOutputs(outputs);
            const { correct } = getCorrectTestCaseCount(outputs);
            toastNotify(`You got ${correct} tests correct out of ${outputs.length} tests!`);
        } else {
            toastNotify(`Oops, ${message}`, ToastType.ERROR);
        }
    };

    const submitCode = async () => {
        setIsLoading(true);
        const {
            ok,
            data: newSubmission,
            message,
        } = await postSubmission(exercise._id, { code: userSolution });
        setIsLoading(false);

        console.log('Submission result:', newSubmission);

        if (ok && newSubmission) {
            setUserSubmission(newSubmission);
            if (newSubmission.correct) {
                toastNotify('Your submission status is correct!', ToastType.SUCCESS);
                setShowInviteModal(true);
            } else {
                toastNotify(`Submission status is incorrect. Debug your code and try again!`);
            }
        } else {
            toastNotify(`Oops, ${message}`, ToastType.ERROR);
        }
    };

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
    };

    return (
        <ExerciseAttemptContext.Provider value={value}>
            {children}
            {showInviteModal && (
                <ShowcaseInviteModal
                    onClose={() => setShowInviteModal(false)}
                ></ShowcaseInviteModal>
            )}
        </ExerciseAttemptContext.Provider>
    );
};
