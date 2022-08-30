import React from "react";
import EditorControlBar from "./EditorControlBar";
import CodeEditor from "../../ui/editor/code-editor/CodeEditor";
import TestCaseOutput from "../../ui/test-cases/TestCaseOutput";
import { ITestCase } from "../../../models/interfaces";
import { useExerciseAttemptCtx } from "../../../store/context/ExerciseAttemptContext";
import Button from "../../ui/buttons/Button";
const btnClass = "min-w-[10rem] mr-2 xl:mr-4";

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
    <div className="flex-1 overflow-y-scroll">
      <EditorControlBar />
      <CodeEditor
        onChange={handleChange}
        height={"30rem"}
        showHeader={false}
        className="mr-2 xl:mr-4"
      />
      <h1 className="text-xl text-text-500 py-2">Output</h1>
      <ul className="flex flex-col gap-4 pr-2 xl:pr-4 py-2 w-full">
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
      <div className="flex flex-row justify-end pr-2 xl:pr-2 py-2">
        <Button className={btnClass} mode="empty">
          Run Code
        </Button>
        <Button className={btnClass}>Submit</Button>
      </div>
    </div>
  );
};

export default EditorOutputSection;
