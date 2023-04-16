import { IExerciseWithId, ITestCase, ITestOutput } from '..';
import { CreationSection, Difficulty, Language } from '../../enums';

export interface IReadyStatus {
  status: 'success' | 'error';
  message: string;
}

export interface IExerciseCreationContext {
  name: string;
  setName: (name: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  prompt: string;
  difficulty: Difficulty;
  setDifficulty: (diff: Difficulty) => void;
  setPrompt: (text: string) => void;
  testCases: ITestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<ITestCase[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  startingTemplate: string;
  setStartingTemplate: React.Dispatch<React.SetStateAction<string>>;
  solutionCode: string;
  setSolutionCode: React.Dispatch<React.SetStateAction<string>>;
  saveDraft: () => void;
  saveExercise: () => void;
  runCode: () => void;
  readyStatus: IReadyStatus | null;
  testCaseOutputs: ITestOutput[];
  isLoading: boolean;
  createdExercise: null | IExerciseWithId;
  activeSection: CreationSection | null;
  setActiveSection: React.Dispatch<React.SetStateAction<CreationSection | null>>;
}
