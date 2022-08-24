import React, { useState } from 'react';

function saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key: string) {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : '';
}

function useLocalStorage<T>(key: string, initialValue: any): [T, (newValue: any) => void] {
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

    const handleChange = (newValue: any) => {
        setValue(() => {
            saveToLocalStorage(key, newValue);
            return newValue;
        });
    };

    return [value, handleChange];
}

export default useLocalStorage;
