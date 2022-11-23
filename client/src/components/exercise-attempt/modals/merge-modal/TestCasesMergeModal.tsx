import { FC, useCallback, useMemo, useState } from 'react';
import { GoGitMerge } from 'react-icons/go';
import { VscRunAll } from 'react-icons/vsc';
import { ClipLoader } from 'react-spinners';

import { postTestCasesMerge } from '../../../../apis/exercise.api';
import { ITestCaseWithOutput } from '../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { toastNotify } from '../../../../utils/notification';
import useCustomTests from '../../hooks/useCustomTests';
import useTestCasesWithOutputs from '../../hooks/useTestCasesWithOutputs';
import Button from '../../../ui/buttons/Button';
import AnimationModal from '../../../ui/modals/AnimationModal';
import MergeableTestCasesList from './MergeableTestCasesList';

interface Props {
    open: boolean;
    onClose: () => void;
}

const renameTestCases = (tests: ITestCaseWithOutput[]): ITestCaseWithOutput[] => {
    let customTestCount = 0,
        existingTestCount = 0;
    const renamedTests = tests.map((test) => {
        if (test.custom) {
            customTestCount++;
            return { ...test, name: `Custom Test ${customTestCount}` };
        } else {
            existingTestCount++;
            return { ...test, name: `Existing Test ${existingTestCount}` };
        }
    });
    return renamedTests;
};

const TestCasesMergeModal: FC<Props> = ({ open, onClose }) => {
    const {
        exercise,
        customTests,
        setCustomTests,
        runCode,
        isLoading: runCodeLoading,
        refetchExercise,
    } = useExerciseAttemptCtx();

    const testCasesWithOutputs = useTestCasesWithOutputs();
    const { addCustomTest } = useCustomTests();
    const [requestLoading, setRequestLoading] = useState(false);

    if (exercise == null) return null;

    const mergeTestCases = useCallback(async () => {
        const newTests = customTests.map((test) => ({
            ...test,
            custom: undefined,
            _id: undefined,
        }));

        setRequestLoading(true);
        const { ok, data, message } = await postTestCasesMerge(exercise._id, newTests);
        setRequestLoading(false);

        if (ok && data) {
            if (data.insertedCount === 0) toastNotify('0 test cases were merged', 'info');
            else
                toastNotify(
                    `${data.insertedCount} test case${
                        data.insertedCount > 1 ? 's were' : ' was'
                    } merged successfully!`,
                    'success',
                );
            setCustomTests([]);
            refetchExercise();
            onClose();
        } else {
            toastNotify(`Error: ${message}`, 'error');
        }
    }, [exercise._id, customTests, onClose]);

    const renamedTests = useMemo(
        () => renameTestCases(testCasesWithOutputs),
        [testCasesWithOutputs],
    );

    return (
        <AnimationModal
            open={open}
            onClose={onClose}
            className="!rounded-md w-[clamp(25rem,50rem,96vw)] overflow-hidden"
        >
            <section className="flex flex-col text-gray-700">
                <header className="px-7 py-4 shadow-md border-b-2 border-gray-200">
                    <h2 className="text-2xl flex-start gap-2">
                        <GoGitMerge className="text-main-400 text-3xl" />
                        Merge Custom Tests
                    </h2>
                </header>
                <div className="flex flex-col gap-2 pt-2 pb-4 text-slate-700 bg-slate-100">
                    <div className="max-h-[30rem] max-w-[100%] flex flex-col gap-3 px-7 py-2 overflow-y-scroll">
                        <p>
                            You can add your custom tests to the existing challenge to
                            enhance our tests! But, the maximum number of tests that the
                            challenge can have are <span className="mark">30</span> for
                            now.
                        </p>

                        <div className="flex-between">
                            <p className="text-lg font-semibold">
                                Total {testCasesWithOutputs.length} Tests
                            </p>

                            <Button
                                onClick={addCustomTest}
                                className="min-w-[4rem] ml-auto mr-2 !py-1 !rounded-md"
                                size="small"
                                mode="empty"
                            >
                                + Add
                            </Button>
                            {runCodeLoading && <ClipLoader color="#5552e4" size={30} />}
                            {!runCodeLoading && (
                                <Button
                                    onClick={runCode}
                                    size="small"
                                    className="min-w-[4rem] flex-center gap-1 !py-1 !rounded-md"
                                >
                                    <VscRunAll />
                                    Run
                                </Button>
                            )}
                        </div>
                        <MergeableTestCasesList
                            exercise={exercise}
                            testCases={renamedTests}
                        />
                    </div>

                    {/* Action buttons for moving to showcase page or closing modal */}
                    <div className="flex-between pt-2 px-7">
                        {requestLoading && <ClipLoader color="#5552e4" size={40} />}
                        {!requestLoading && (
                            <button
                                onClick={mergeTestCases}
                                className={
                                    'px-3 py-2 text-lg rounded-sm bg-gray-700 hover:bg-gray-800 text-white shadow-md'
                                }
                            >
                                Confirm & Merge
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="px-3 py-2 text-lg rounded-sm bg-white hover:bg-gray-700 hover:text-white shadow-md hover:shadow-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </section>
        </AnimationModal>
    );
};

export default TestCasesMergeModal;
