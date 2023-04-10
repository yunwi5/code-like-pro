export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export function deslugify(str: string): string {
  return str
    .replace(/-/g, ' ')
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}
