import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'instant' as any });
    }, [pathname]);

    return null;
}
