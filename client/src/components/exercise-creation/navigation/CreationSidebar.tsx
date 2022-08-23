import React from 'react';
import { CreationSectionList } from '../../../models/enums';

const CreationSidebar: React.FC = () => {
    return (
        <aside className="ml-4 min-w-[12.5rem]">
            <nav className="sticky top-[6rem]">
                <h3 className="text-main-500 text-xl">Sections</h3>
                <ul className="flex flex-col gap-1 mt-1 pl-2 border-l-[4px] border-l-gray-400/70">
                    {CreationSectionList.map((section) => (
                        <li key={section} className="cursor-pointer text-lg">
                            <a
                                className="hover:text-main-500 link-underline-effect"
                                href={`#${section}`}
                            >
                                {section}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default CreationSidebar;
