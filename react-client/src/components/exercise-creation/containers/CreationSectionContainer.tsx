import React, { useRef } from 'react';
import { CreationSection } from '../../../models/enums';
import useScrollEffect from '../../../hooks/ui/useScrollEffect';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';

interface Props {
    title: string | JSX.Element;
    children: React.ReactNode;
    testId?: string;
    id: CreationSection;
    className?: string;
}

// Wrapper component for each section of exercise creation.
const CreationSectionContainer: React.FC<Props> = ({
    id,
    testId,
    title,
    className,
    children,
}) => {
    const { setActiveSection, activeSection } = useExerciseCreationContext();
    const sectionRef = useRef<HTMLElement>(null);

    // Scroll effect on the sidebar, so that currently viewed section is highlighted on the sidebar (with our main color).
    useScrollEffect({
        elementRef: sectionRef,
        callbackOnView: () => {
            if (activeSection !== id) setActiveSection(id);
        },
    });

    return (
        <section
            className={`flex flex-col gap-3 ${className ?? ''}`}
            id={id}
            ref={sectionRef}
        >
            <h2 className="font-semibold text-xl">{title}</h2>
            {children}
        </section>
    );
};

export default CreationSectionContainer;
