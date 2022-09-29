// Remove all spaces of the string
export function removeAllSpaces(str: string) {
    return str.trim().split(/\s+/).join('');
}

export function capitalizeString(str: string): string {
    const words = str.split(/\s+/);
    const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}
