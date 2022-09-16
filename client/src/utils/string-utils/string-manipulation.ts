// Remove all spaces of the string
export function removeAllSpaces(str: string) {
    return str.trim().split(/\s+/).join('');
}
