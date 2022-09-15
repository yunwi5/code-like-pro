export function convertToQueryString(str: string) {
    return str.split(' ').join('+');
}

export function parseQueryString<T>(queryString: string | null | undefined) {
    if (!queryString) return null;
    return queryString.split('+').join(' ') as T;
}
