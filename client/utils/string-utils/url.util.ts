export function convertToUrlString(str: string) {
  return str.split(' ').join('+');
}

export function parseUrlString(queryString: string | null | undefined) {
  if (!queryString) return null;
  return queryString.split('+').join(' ');
}
