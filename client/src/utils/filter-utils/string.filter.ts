export function filterListByString(
    list: string[],
    searchStr: string,
    caseInsensitive: boolean = true,
) {
    return list.filter((str) => {
        if (caseInsensitive)
            return str.trim().toLowerCase().includes(searchStr.trim().toLowerCase());
        return str.trim().includes(searchStr.trim());
    });
}
