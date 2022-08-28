import React from 'react';
import { CreationSectionList } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import ChallengeActions from '../sections/ChallengeActions';

const CreationSidebar: React.FC = () => {
    const { activeSection } = useExerciseCreationContext();

    return (
        <aside className="hidden lg:block ml-4 xl:min-w-[12.5rem]">
            <nav className="sticky top-[7rem]">
                <h3 className="text-main-500 text-xl">Sections</h3>
                <ul className="flex flex-col gap-1 mt-1 pl-2 border-l-[4px] border-l-gray-400/70">
                    {CreationSectionList.map((section: any) => (
                        <li key={section} className="cursor-pointer text-lg">
                            <a
                                className={`hover:text-main-500 link-underline-effect ${
                                    activeSection === section
                                        ? 'text-main-500/90 font-bold'
                                        : ''
                                }`}
                                href={`#${section}`}
                            >
                                {section}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sticky top-[23.5rem]">
                <ChallengeActions />
            </div>
        </aside>
    );
};

export default CreationSidebar;
