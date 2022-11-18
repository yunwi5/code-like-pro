import { useEffect, useState } from 'react';

function saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key: string) {
    try {
        const jsonValue = localStorage.getItem(key);
        // JS can raise an error if the jsonValue is invalid to be parsed.
        return JSON.parse(jsonValue || '');
    } catch (err) {
        return null;
    }
}

// Custom react hook to store the JSON object in localStorage.
// It abstracts the process of retrieving JSON from the localStorage, and store JSON to the localStorage.
function useLocalStorage<T>(
    key: string,
    initialValue: any,
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const storedValue = getFromLocalStorage(key);
        // If a value already exists, the initialValue param should be ignored.
        if (storedValue == null) {
            saveToLocalStorage(key, initialValue);
            return initialValue;
        } else {
            return storedValue;
        }
    });

    useEffect(() => {
        saveToLocalStorage(key, value);
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
