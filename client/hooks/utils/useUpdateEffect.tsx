import { useEffect, useRef } from 'react';

// The useEffect hook runs on mount by default.
// This custom hook prevents useEffect to run on mount.
// This hook let the useEffect callback function to run only after the first mount.
function useUpdateEffect(callback: Function, dependencies: any[]) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}

export default useUpdateEffect;
