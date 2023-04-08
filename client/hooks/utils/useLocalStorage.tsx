import { useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage.util';

// Custom react hook to store the JSON object in localStorage.
// It abstracts the process of retrieving JSON from the localStorage, and store JSON to the localStorage.
function useLocalStorage<T>(
  key: string,
  initialValue: any,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = getFromLocalStorage<T>(key);
    // If a value already exists, the initialValue param should be ignored.
    if (storedValue == null) {
      saveToLocalStorage<T>(key, initialValue);
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
