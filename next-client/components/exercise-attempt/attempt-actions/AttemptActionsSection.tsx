import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';

import CodeEditorSettingsBoard from '@/components/ui/editor/code-editor/CodeEditorSettingsBoard';

import EditorControlBar from './control-bar/EditorControlBar';
import EditorActions from './editor-actions/EditorActions';
import EditorWorkspace from './editor-workspace/EditorWorkspace';

const AttemptActionsSection: React.FC = () => {
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [showEditorSettings, setShowEditorSettings] = useState(false);

  return (
    <div className="flex-1 flex flex-col relative">
      <EditorControlBar />

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

          <button
            onClick={() => setShowEditorSettings((ps) => !ps)}
            className="ml-auto px-2 py-1 bg-slate-200 hover:bg-slate-300 shadow rounded-md transition-all cursor-pointer"
          >
            <IoMdSettings className="text-xl" />
          </button>
        </div>

        <CodeEditorSettingsBoard
          open={showEditorSettings}
          onClose={() => setShowEditorSettings(false)}
        />
        <EditorWorkspace key={solutionIndex} index={solutionIndex} />
      </div>

      <EditorActions />
    </div>
  );
};

export default AttemptActionsSection;
