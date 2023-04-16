import React from 'react';
import { CreationSectionList } from '../../../models/enums';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import ChallengeActions from '../sections/CreationActions';

const CreationSidebar: React.FC = () => {
    const { activeSection } = useExerciseCreationContext();

    return (
        <aside className="hidden lg:block ml-4 xl:min-w-[12.5rem]">
            <nav className="sticky top-[7rem]">
                <h3 className="text-main-500 text-xl">Sections</h3>
                <ul className="flex flex-col mt-1">
                    {CreationSectionList.map((section: any) => {
                        const activeClass =
                            section === activeSection
                                ? 'text-main-500 font-semibold !border-l-main-300/90'
                                : 'border-l-gray-400/70';

                        return (
                            <li
                                key={section}
                                className={`py-1 pl-2 border-l-[4px] border-l-gray-400/70 cursor-pointer text-lg ${activeClass}`}
                            >
                                <a
                                    className={`hover:text-main-600 link-underline-effect`}
                                    href={`#${section}`}
                                >
                                    {section}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="sticky top-[23.5rem]">
                <ChallengeActions />
            </div>
        </aside>
    );
};

export default CreationSidebar;
