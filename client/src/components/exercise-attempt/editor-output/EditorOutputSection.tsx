import React from "react";
import EditorControlBar from "./EditorControlBar";
import CodeEditor from "../../ui/editor/code-editor/CodeEditor";
import { useExerciseCreationContext } from "../../../store/context/ExerciseCreationContext";

const EditorOutputSection: React.FC = () => {
  const { language, solutionCode, setSolutionCode } =
    useExerciseCreationContext();

  const handleChange = (value: string | undefined) =>
    setSolutionCode(value ?? "");
  return (
    <div className="flex-1">
      <EditorControlBar />
      <CodeEditor
        language={language}
        onChange={handleChange}
        value={solutionCode}
        height={"22rem"}
      />
    </div>
  );
};

export default EditorOutputSection;
