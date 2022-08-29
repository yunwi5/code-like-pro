import React from 'react';
import { SubSection, SubSectionList } from './ExerciseInfoSection';

interface Props {
    activeSubSection: SubSection;
    setActiveSubSection: React.Dispatch<React.SetStateAction<SubSection>>;
}

// Section navigation to switch between prompt, test cases, and scratch pad sub sections.
// Choosing or clicking one subsection should switch to that particular subsection.
const ExerciseInfoNav: React.FC<Props> = ({ activeSubSection, setActiveSubSection }) => {
    return (
        <nav className="flex text-lg">
            {SubSectionList.map((section, idx) => {
                let className =
                    'flex-1 flex-center px-2 py-2 !cursor-pointer transition-all hover:bg-gray-600 hover:text-gray-50';
                if (idx > 0) {
                    className += ' flex-1 border-l-2 border-gray-400';
                }
                if (section === activeSubSection) {
                    className += ' bg-white';
                }

                return (
                    <div
                        key={section}
                        className={`${className}`}
                        onClick={() => setActiveSubSection(section)}
                    >
                        {section}
                    </div>
                );
            })}
        </nav>
    );
};

export default ExerciseInfoNav;
