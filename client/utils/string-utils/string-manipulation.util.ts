import { Language } from '../../models/enums';

// Remove all spaces of the string
export function removeAllSpaces(str: string) {
  return str.trim().split(/\s+/).join('');
}

export function capitalize(str: string): string {
  const words = str.split(/\s+/);
  const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

// Insert the tab at the beginning
// Return the indented string back
export function indentEachLine(linesString: string, indentChar: string = '\t'): string {
  return linesString
    .split('\n')
    .map((line) => `${indentChar}${line}`)
    .join('\n')
    .trimEnd();
}

// Function that removes all the comment lines from the code
export function removeCommentLines(code: string, language: Language): string {
  const codeLines = code.split('\n');

  switch (language) {
    case Language.C:
    case Language.CPP:
    case Language.JAVA:
    case Language.JAVASCRIPT: {
      // Remove comment lines as well as empty lines
      return codeLines
        .filter((codeLine) => !codeLine.trim().startsWith('//') && codeLine.trim() !== '')
        .join('\n');
    }
    case Language.PYTHON: {
      // Remove comment lines as well as empty lines
      return codeLines
        .filter((codeLine) => !codeLine.trim().startsWith('#') && codeLine.trim() !== '')
        .join('\n');
    }
    default:
      return code;
  }
}
