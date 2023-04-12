import React from 'react';
import { AiFillWechat } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';
import { FaLaptopCode } from 'react-icons/fa';
import { TbBulb } from 'react-icons/tb';

import { ShowCaseSection, ShowCaseSectionList } from '../../models/enums';
import RoundButton from '../ui/buttons/RoundButton';

interface Props {
  activeSection: ShowCaseSection;
  setActiveSection: (section: ShowCaseSection) => void;
  setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Showcase nav layout break point is md - 768px. */
const ShowcaseNav: React.FC<Props> = ({ activeSection, setActiveSection, setShowPostModal }) => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center gap-x-2 gap-y-4">
      {/* Showcase section navigation as a list */}
      <div className="self-stretch flex flex-col xs:flex-row md:justify-start items-center gap-x-1 sm:gap-x-3 gap-y-2">
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
              className={`self-stretch flex-1 flex-center gap-1 sm:gap-2 px-2 sm:px-4 py-[0.35rem] text-base sm:text-lg rounded whitespace-nowrap hover:text-main-500 hover:bg-gray-100/80 ${activeClass}`}
            >
              {getSectionIcon(section)}
              {section}
            </button>
          );
        })}
      </div>

      {/* Posting showcase action trigger */}
      <RoundButton
        onClick={() => setShowPostModal(true)}
        className="self-stretch xs:self-end flex-center gap-2 text-base"
      >
        <BiCodeAlt className="text-xl" />
        Post Showcase
      </RoundButton>
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
