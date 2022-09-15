import React from 'react';
import { AiFillWechat } from 'react-icons/ai';
import { FaLaptopCode } from 'react-icons/fa';
import { TbBulb } from 'react-icons/tb';
import { BiCodeAlt } from 'react-icons/bi';
import RoundButton from '../ui/buttons/RoundButton';
import { ShowCaseSection, ShowCaseSectionList } from '../../models/enums';

interface Props {
    activeSection: ShowCaseSection;
    setActiveSection: (section: ShowCaseSection) => void;
    setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowcaseNav: React.FC<Props> = ({
    activeSection,
    setActiveSection,
    setShowPostModal,
}) => {
    return (
        <nav className="flex justify-between items-center">
            {/* Showcase section navigation as a list */}
            <div className="flex justify-start items-center gap-3">
                {ShowCaseSectionList.map((section) => {
                    let activeClass = '';
                    if (activeSection === section) {
                        activeClass +=
                            'text-gray-50 hover:!text-white !bg-gray-600/90 hover:!bg-gray-700 brightness-110 shadow';
                    }

                    return (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`flex-center gap-2 px-4 py-[0.35rem] text-lg rounded hover:text-main-500 hover:bg-gray-100/80 ${activeClass}`}
                        >
                            {getSectionIcon(section)}
                            {section}
                        </button>
                    );
                })}
            </div>

            {/* Posting showcase action trigger */}
            <div>
                <RoundButton
                    onClick={() => setShowPostModal(true)}
                    className="flex-center gap-2 text-base"
                >
                    <BiCodeAlt className="text-xl" />
                    Post Showcase
                </RoundButton>
            </div>
        </nav>
    );
};

function getSectionIcon(section: ShowCaseSection) {
    switch (section) {
        case ShowCaseSection.MODEL_ANSWER:
            return <TbBulb className="text-xl" />;
        case ShowCaseSection.SHOWCASES:
            return <FaLaptopCode className="text-xl" />;
        case ShowCaseSection.DISCUSSIONS:
            return <AiFillWechat className="text-xl" />;
    }
}

export default ShowcaseNav;
