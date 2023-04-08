import { useEffect, useState } from 'react';

function useForceRerender(renderInterval: number) {
    const [_, setRenderCount] = useState(0);

    // Trick to force the component to render once more.
    useEffect(() => {
        let timer = setTimeout(() => {
            setRenderCount((prev) => prev + 1);
        }, renderInterval);

        return () => clearTimeout(timer);
    }, []);

    return;
}

export default useForceRerender;
