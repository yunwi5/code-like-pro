import { GoCommentDiscussion } from 'react-icons/go';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { VscTypeHierarchy, VscFeedback } from 'react-icons/vsc';

import {
    CourseList,
    ForumCategory,
    ForumPostType,
    LanguageList,
    ProgrammingTopicList,
} from '../models/enums';
import { FaReact, FaUniversity } from 'react-icons/fa';
import { IoBusinessSharp } from 'react-icons/io5';
import { prettierLanguageName } from './language';
import { GrAnnounce } from 'react-icons/gr';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { RiSlideshow3Line } from 'react-icons/ri';
import { AiOutlineNotification } from 'react-icons/ai';

export const ForumIcons = {
    [ForumCategory.GENERAL]: <GoCommentDiscussion className="inline text-[1.2em]" />,
    [ForumCategory.ALGORITHMS]: <VscTypeHierarchy className="inline text-[1.2em]" />,
    [ForumCategory.INTERVIEWS]: <MdOutlinePeopleAlt className="inline text-[1.2em]" />,
    [ForumCategory.CAREERS]: <IoBusinessSharp className="inline text-[1.2em]" />,
    [ForumCategory.TECHNOLOGIES]: <FaReact className="inline text-[1.2em]" />,
    [ForumCategory.UNIVERSITY]: <FaUniversity className="inline text-[1.2em]" />,
    [ForumCategory.FEEDBACK]: <VscFeedback className="inline text-[1.2em]" />,
};

export const ForumTypeIcons = {
    [ForumPostType.ANNOUNCEMENT]: (
        <AiOutlineNotification className="inline text-[1.2em]" />
    ),
    [ForumPostType.QUESTION]: <BsQuestionCircleFill className="inline text-[1.2em]" />,
    [ForumPostType.SHOWCASE]: <RiSlideshow3Line className="inline text-[1.2em]" />,
};

// Each forum tags (needs to be updated)
export const ForumTags = {
    [ForumCategory.GENERAL]: ['General tag', 'Others'],
    [ForumCategory.ALGORITHMS]: [...ProgrammingTopicList, 'Others'],
    [ForumCategory.INTERVIEWS]: [
        'Behavior',
        'Interview Preparation',
        'Technical Interviews',
        'Others',
    ],
    [ForumCategory.CAREERS]: [
        'General',
        'Opportunities',
        'Software Engineers',
        'Data Scientist',
        'Internships',
        'Full-time Jobs',
        'Others',
    ],
    [ForumCategory.TECHNOLOGIES]: [
        ...LanguageList.map((lang) => prettierLanguageName(lang)),
        'React',
        'Angular',
        'Vue',
        'NextJs',
        'NestJs',
        'Sprint Boot',
        'Others',
    ],
    [ForumCategory.UNIVERSITY]: [...CourseList, 'Others'],
    [ForumCategory.FEEDBACK]: [
        'General Enquiry',
        'New Feature',
        'Bug Reports',
        'UI/UX Issues',
        'Privacy & Security',
        'Others',
    ],
};