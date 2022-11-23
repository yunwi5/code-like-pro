import { useMemo, useState } from 'react';
import { ITestCaseWithOutput } from '../../../../../models/interfaces';
import useCustomTests from '../../../hooks/useCustomTests';
import useTestCasesWithOutputs from '../../../hooks/useTestCasesWithOutputs';
import TestCasesMergeModal from '../../../modals/merge-modal/TestCasesMergeModal';
import TestCaseMessages from './TestCaseMessages';
import TestCasesList from './TestCasesList';
import TestCaseUserActions from './TestCaseUserActions';

const areTestsMergeable = (testCasesWithOutputs: ITestCaseWithOutput[]): boolean => {
    return (
        testCasesWithOutputs.some((test) => test.custom) &&
        testCasesWithOutputs.every((test) => test.output?.correct)
    );
};

// Displaying list of test cases for the user view.
// Should not allow users to modify or delete any test cases.
const AttemptTestCases: React.FC = () => {
    const [showMergeModal, setShowMergeModal] = useState(false);
    const { addCustomTest, updateCustomTest, deleteCustomTest } = useCustomTests();

    const testCasesWithOutputs: ITestCaseWithOutput[] = useTestCasesWithOutputs();

    // Hidden tests should not be displayed during attempt.
    const nonHiddenTests = useMemo(
        () => testCasesWithOutputs.filter((test) => test.custom || !test.hidden),
        [testCasesWithOutputs],
    );
    const mergeReady: boolean = useMemo(
        () => areTestsMergeable(testCasesWithOutputs),
        [testCasesWithOutputs],
    );

    return (
        <section
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="flex-1 max-h-[92vh] overflow-y-scroll bg-white pt-2 pb-5"
        >
            <div className="flex flex-wrap justify-between items-center">
                <TestCaseMessages testCasesWithOutputs={testCasesWithOutputs} />
                <TestCaseUserActions
                    onAddCase={addCustomTest}
                    onMerge={() => setShowMergeModal(true)}
                    mergeReady={mergeReady}
                />
            </div>

            {/* List of testcases combining creator's tests and user defined custom tests. */}
            <TestCasesList
                testCasesWithOutputs={nonHiddenTests}
                updateCustomTestCase={updateCustomTest}
                deleteCustomTestCase={deleteCustomTest}
            />

            {/* Modal for adding user tests to existing tests */}
            <TestCasesMergeModal
                open={showMergeModal}
                onClose={() => setShowMergeModal(false)}
            />
        </section>
    );
};

export default AttemptTestCases;
