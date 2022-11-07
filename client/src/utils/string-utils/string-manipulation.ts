// Remove all spaces of the string
export function removeAllSpaces(str: string) {
    return str.trim().split(/\s+/).join('');
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

export function capitalizeString(str: string): string {
    const words = str.split(/\s+/);
    const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}
