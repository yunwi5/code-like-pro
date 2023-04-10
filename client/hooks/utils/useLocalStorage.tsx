import { useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage.util';

// Custom react hook to store the JSON object in localStorage.
// It abstracts the process of retrieving JSON from the localStorage, and store JSON to the localStorage.
function useLocalStorage<T>(
  key: string,
  initialValue: any,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const storedValue = getFromLocalStorage<T>(key);
    if (storedValue == null) {
      saveToLocalStorage<T>(key, initialValue);
      setValue(initialValue);
    } else {
      setValue(storedValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    saveToLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
