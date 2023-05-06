import React, { useEffect } from 'react';

import useLocalStorage from '../../../../hooks/utils/useLocalStorage';
import { Language } from '../../../../models/enums';
import { IExerciseWithId } from '../../../../models/interfaces';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import CodeEditor from '../../../ui/editor/code-editor/CodeEditor';

function getIndexedStartingTemplate(exercise: IExerciseWithId | null, solutionIndex: number) {
  let solution = `${exercise?.language === Language.PYTHON ? '#' : '//'} Solution ${
    solutionIndex + 1
  }\n`;
  if (exercise?.startingTemplate) solution = `${solution}${exercise.startingTemplate}`;
  return solution;
}

// Code editor workspace where users can write coding solution
const EditorWorkspace: React.FC<{ index: number }> = ({ index }) => {
  const { exercise, setUserSolution, runCode, submitCode } = useExerciseAttemptCtx();

  // Store current user's code in the localStorate, so that it is not lost when the user refreshes the page.
  // There are total 3 versions of solutions, so add solution index as part of its key.
  const localStorageKey = `user-solution-${exercise?._id}-${index}`;
  const [localSolution, setLocalSolution] = useLocalStorage<string>(
    localStorageKey,
    getIndexedStartingTemplate(exercise, index),
  );

  // Whenever the code changes, set user solution as well as set value to the localStorage.
  const handleChange = (value: string | undefined) => {
    setUserSolution(value ?? '');
    setLocalSolution(value ?? '');
  };

  // When the user re-enters the page, or refreshes the page,
  // Retrieve previous user code for this exercise from the localStorage.
  useEffect(() => {
    setUserSolution(localSolution);
  }, [localSolution, setUserSolution]);

  // If the solution is empty at the beginning, apply the starting template from the creator.
  useEffect(() => {
    if (!localSolution) setLocalSolution(exercise?.startingTemplate || '');
  }, [exercise?.startingTemplate, localSolution, setLocalSolution]);

  return (
    <CodeEditor
      language={exercise?.language}
      onChange={handleChange}
      value={localSolution}
      height={'25rem'}
      className="flex-1 !border-none lg:!max-w-[50vw] shadow-none"
      editorClassName="!max-w-[100vw]"
      showHeader={false}
      runCode={runCode}
      submitCode={submitCode}
    />
  );
};

export default EditorWorkspace;
