// Get random number between min and max 'inclusive'
export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random string of characters
export function getRandomString() {
    return Math.random().toString(36).substr(2, getRandomNumber(5, 9));
}

// Choose random element of an array
export function randomChoice<T>(array: T[] | readonly T[]): T {
    const randomIndex = getRandomNumber(0, array.length - 1);
    return array[randomIndex];
}

// Choice multiple random elements from an array.
//
export function randomMultipleChoices<T>(
    array: T[] | readonly T[],
    min?: number,
    max?: number,
): T[] {
    let n = array.length;
    const defaultCount = Math.floor(n / 2);
    const randomCount = getRandomNumber(
        Math.min(min ?? defaultCount, n - 1),
        Math.min(max ?? defaultCount, n - 1),
    );
    const set = new Set<T>();

    while (set.size < randomCount) {
        const item = randomChoice(array);
        if (!set.has(item)) set.add(item);
    }

    return Array.from(set);
}

export function shuffleList<T>(list: T[]): T[] {
    for (let i = 0; i < list.length; i++) {
        // Get random index between the start and the end of the list
        const randomIndex = getRandomNumber(0, list.length - 1);

        const value = list[i];
        list[i] = list[randomIndex];
        list[randomIndex] = value;
    }

    return [...list];
}
