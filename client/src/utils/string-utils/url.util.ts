export function convertToUrlString(str: string) {
    return str.split(' ').join('+');
}

export function parseUrlString<T>(queryString: string | null | undefined) {
    if (!queryString) return null;
    return queryString.split('+').join(' ') as T;
}
