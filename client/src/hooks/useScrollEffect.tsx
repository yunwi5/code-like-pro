import React, { useEffect } from 'react';

// Window Scroll offset so that element can be in 'active' state then the window scroll gets closer to its height.
const SCROLL_OFFSET = 25;

interface Props {
    elementRef: React.RefObject<HTMLElement>;
    // Callback function to call when the element is on the view (visible on the current scroll).
    callbackOnView: Function;
}

// Custom hook for when the element on the HTML page appears when scrolling.
// This is used for scrolling effect of a React component.
// For example, when the user scolls down and reached the 'prompt' section,
// it detects the fact that current scroll is on the 'prompt' component and it will call the callback function to signal.
const useScrollEffect = ({ elementRef, callbackOnView }: Props) => {
    useEffect(() => {
        const scrollEffect = (e: Event) => {
            if (elementRef.current == null) return;
            const rect = elementRef.current.getBoundingClientRect();

            const distanceFromTop = window.pageYOffset + rect.top;
            const belowSectionTop = window.scrollY + SCROLL_OFFSET >= distanceFromTop;
            const aboveSectionBottom = window.scrollY < distanceFromTop + rect.height;
            if (belowSectionTop && aboveSectionBottom) callbackOnView();
        };

        // Due to performance issue, make scrollEffect as lower pripority using the timeout.
        const timer = setTimeout(() => {
            window.addEventListener('scroll', scrollEffect);
            clearTimeout(timer);
        }, 500);
        return () => window.removeEventListener('scroll', scrollEffect);
    }, []);

    return;
};

export default useScrollEffect;
