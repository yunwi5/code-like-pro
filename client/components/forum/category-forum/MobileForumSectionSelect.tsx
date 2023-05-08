import React from 'react';

import { ForumCategorySection, ForumCategorySectionList } from '../../../models/enums';
import Button from '../../ui/buttons/Button';

interface Props {
  selectedSection: ForumCategorySection;
  setSelectedSection: (section: ForumCategorySection) => void;
}

/* Used in mobile screen size < 1024px, to select the section either sidebar or post content to be displayed. */
const MobileForumSectionSelect: React.FC<Props> = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="lg:hidden mt-4 sm:mt-1 mb-[1.75rem] flex justify-end gap-2">
      {ForumCategorySectionList.map((section) => (
        <Button
          className="grow sm:grow-0"
          key={section}
          size="small"
          mode={section === selectedSection ? 'fill' : 'empty'}
          onClick={() => setSelectedSection(section)}
        >
          {section}
        </Button>
      ))}
    </div>
  );
};

export default MobileForumSectionSelect;
