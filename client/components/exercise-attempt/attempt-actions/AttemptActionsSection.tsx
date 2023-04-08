import React, { useState } from 'react';
import EditorControlBar from './control-bar/EditorControlBar';
import EditorActions from './editor-actions/EditorActions';
import EditorWorkspace from './editor-workspace/EditorWorkspace';

// Exercise attempt output section where users mainly code their solution (right side on the desktop screen)
const AttemptActionsSection: React.FC = () => {
  // Solution number (index) that is currently selected by the user.
  // There are possibly 3 different solutions that the user can write for this exercise.
  const [solutionIndex, setSolutionIndex] = useState(0);

  return (
    <div className="flex-1 flex flex-col">
      {/* Controlbar that handles favorite and report UI and functionalities */}
      <EditorControlBar />

      {/* Selecting solution number that the user wants to keep working. There are solutions 1 ~ 3 for each exercise. */}
      <div className="flex-1 flex flex-col">
        <div className="flex gap-3 px-3 py-1 text-gray-600 bg-gray-50 border-b-[1.5px] border-b-slate-200">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`px-2 py-1 font-semibold rounded cursor-pointer hover:bg-slate-200 hover:text-main-500 ${
                index === solutionIndex ? 'bg-slate-200/80 text-main-500' : ''
              }`}
              onClick={() => setSolutionIndex(index)}
            >
              Solution {index + 1}
            </span>
          ))}
        </div>

        {/* Code editor workspace. Users write solution code. */}
        <EditorWorkspace key={solutionIndex} index={solutionIndex} />
      </div>

      {/* Editor actions including navigation, run code and submit code functionalities. */}
      <EditorActions />
    </div>
  );
};

export default AttemptActionsSection;
