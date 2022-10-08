import { GoCommentDiscussion } from 'react-icons/go';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { FaReact, FaUniversity } from 'react-icons/fa';
import { IoBusinessSharp } from 'react-icons/io5';
import { VscTypeHierarchy, VscFeedback } from 'react-icons/vsc';
import { BsQuestionCircle } from 'react-icons/bs';
import { RiSlideshow3Line } from 'react-icons/ri';
import { AiOutlineNotification } from 'react-icons/ai';

import {
    CourseList,
    ForumCategory,
    ForumPostType,
    LanguageList,
    ProgrammingTopicList,
} from '../models/enums';
import { prettierLanguageName } from './language';

export const ForumIcons = {
    [ForumCategory.GENERAL]: <GoCommentDiscussion className="inline text-[1.2em]" />,
    [ForumCategory.ALGORITHMS]: <VscTypeHierarchy className="inline text-[1.2em]" />,
    [ForumCategory.INTERVIEWS]: <MdOutlinePeopleAlt className="inline text-[1.2em]" />,
    [ForumCategory.CAREERS]: <IoBusinessSharp className="inline text-[1.2em]" />,
    [ForumCategory.TECHNOLOGIES]: <FaReact className="inline text-[1.2em]" />,
    [ForumCategory.UNIVERSITY]: <FaUniversity className="inline text-[1.2em]" />,
    [ForumCategory.FEEDBACK]: <VscFeedback className="inline text-[1.2em]" />,
};

export const ForumDescriptions = {
    [ForumCategory.GENERAL]:
        'Where you discuss general queries and posts about anything.',
    [ForumCategory.ALGORITHMS]: 'Discuss algorithm knowledges in depth!',
    [ForumCategory.INTERVIEWS]:
        'Discuss how to master the notorious technical interviews',
    [ForumCategory.CAREERS]:
        'Discuss future career path as programmers or software engineers!',
    [ForumCategory.TECHNOLOGIES]:
        'Trendy technologies React, Vue, Svelte, Flutter, Kotlin, Swift, ...',
    [ForumCategory.UNIVERSITY]:
        'Discuss university courses or degress like CS or SE degree',
    [ForumCategory.FEEDBACK]:
        'Discuss any feedback to our application that we are always welcomed to hear!',
};

export const ForumPostTypeIcons = {
    [ForumPostType.ANNOUNCEMENT]: <AiOutlineNotification className="inline" />,
    [ForumPostType.QUESTION]: <BsQuestionCircle className="inline" />,
    [ForumPostType.SHOWCASE]: <RiSlideshow3Line className="inline" />,
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
