import React from "react";
import EditorControlBar from "./EditorControlBar";
import CodeEditor from "../../ui/editor/code-editor/CodeEditor";
import TestCaseOutput from "../../ui/test-cases/TestCaseOutput";
import { ITestCase } from "../../../models/interfaces";
import { useExerciseAttemptCtx } from "../../../store/context/ExerciseAttemptContext";

const EditorOutputSection: React.FC = () => {
  const { exercise } = useExerciseAttemptCtx();

  const testCases = exercise?.testCases;
  if (exercise == null) return null;

  // Only display non hidden test cases.
  const openTestCases = exercise.testCases.filter((ex) => !ex.hidden);

  const openTestCasesCount = openTestCases.length;
  const hiddenTestCasesCount = exercise.testCases.length - openTestCasesCount;

  const handleChange = (value: string | undefined) => {};
  return (
    <div className="flex-1">
      <EditorControlBar />
      <CodeEditor onChange={handleChange} height={"30rem"} showHeader={false} />
      <h1 className="text-xl text-text-500 py-2">Output</h1>
      <ul className="flex flex-col gap-4 px-2 xl:px-4 py-2">
        {openTestCases.map((openTestCases, idx) => (
          <TestCaseOutput
            key={idx}
            name="Test Case ${idx + 1}"
            expectedOutput={openTestCases.expectedOutput}
            actualOutput=""
            status={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default EditorOutputSection;
