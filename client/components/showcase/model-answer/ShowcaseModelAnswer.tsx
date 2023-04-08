import React from 'react';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import CodeEditor from '../../ui/editor/CodeEditor';
import TextEditor from '../../ui/editor/text-editor/TextEditor';
import TagList from '../../ui/lists/TagList';

// One of showcase sections that displays exercise prompt and model solution from the creator.
const ShowcaseModelAnswer: React.FC = () => {
  const { exercise } = useShowcase();

  if (!exercise) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-around gap-8">
      {/* Exercise prompt */}
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl mb-4">Problem</h2>
        <TextEditor
          className="read-only-editor mb-6"
          value={exercise?.prompt || ''}
          onChange={() => {}}
          readOnly={true}
          placeholder={'Write something awesome...'}
        />
        <TagList tags={exercise.tags} />
      </div>

      {/* Exercise model solution from the creator */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl md:text-2xl mb-4">Model Solution</h2>
        <CodeEditor
          className="flex-1 min-h-[15rem]"
          onChange={() => {}}
          showHeader={false}
          language={exercise.language}
          value={exercise.solutionCode}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default ShowcaseModelAnswer;
