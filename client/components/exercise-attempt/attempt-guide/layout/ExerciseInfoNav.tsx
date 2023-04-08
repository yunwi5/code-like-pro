import React from 'react';
import { BsFileCode } from 'react-icons/bs';
import { GoIssueOpened, GoNote } from 'react-icons/go';
import { IoIosFlask } from 'react-icons/io';
import { SubSection, SubSectionList } from '../AttemptGuideSection';

interface Props {
  activeSubSection: SubSection;
  setActiveSubSection: React.Dispatch<React.SetStateAction<SubSection>>;
}

function getSectionIcon(section: SubSection) {
  if (section === SubSection.PROMPT) return <GoNote />;
  if (section === SubSection.ISSUES) return <GoIssueOpened />;
  if (section === SubSection.TEST_CASES) return <IoIosFlask />;
  if (section === SubSection.SUBMISSION) return <BsFileCode />;
}

// Section navigation to switch between prompt, test cases, and scratch pad sub sections.
// Choosing or clicking one subsection should switch to that particular subsection.
const ExerciseInfoNav: React.FC<Props> = ({ activeSubSection, setActiveSubSection }) => {
  return (
    <nav className="flex text-sm xs:text-base flex-wrap">
      {SubSectionList.map((section, idx) => {
        let className =
          'flex-1 flex-center gap-1 px-2 py-[0.7rem] whitespace-nowrap !cursor-pointer transition-all hover:bg-gray-50 hover:text-main-500';
        if (idx > 0) {
          className += ' flex-1 border-l-2 border-gray-300/70';
        }
        if (section === SubSection.PROMPT) {
          className += ' basis-full sm:basis-0';
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
            <span className="text-[0.95em]">{getSectionIcon(section)}</span>
            {section}
          </div>
        );
      })}
    </nav>
  );
};

export default ExerciseInfoNav;
