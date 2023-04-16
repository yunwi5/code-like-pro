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
    <div className="lg:hidden -mt-1 mb-3 flex gap-2">
      {ForumCategorySectionList.map((section) => (
        <Button
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
