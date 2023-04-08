import Link from 'next/link';
import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

import { ForumCategory } from '../../../models/enums';
import { ForumDescriptions, ForumIcons } from '../../../utils/forum.util';
import { getForumCategoryLink } from '../../../utils/links.util';
import styles from './HomeDiscussions.module.scss';

const ForumCard: React.FC<{ forum: ForumCategory }> = ({ forum }) => (
  <div className={`${styles.card}`}>
    <div
      className={`${styles['card-front']} flex flex-col justify-center items-center py-2 bg-slate-200 rounded-sm shadow`}
    >
      <span className="text-[3rem] text-main-500">{ForumIcons[forum]}</span>
      <h3 className="mt-1 text-xl capitalize text-gray-600 font-semibold">{forum}</h3>
    </div>
    <div
      className={`${styles['card-back']} px-4 py-0 flex-center flex-col gap-2 bg-slate-700 text-gray-50`}
    >
      <BsCheckCircleFill className="text-gray-50 text-2xl" />
      <p className="text-center text-[0.95rem]">{ForumDescriptions[forum]}</p>
      <Link
        href={getForumCategoryLink(forum)}
        className="text-blue-300 hover:text-blue-200"
      >
        Explore
      </Link>
    </div>
  </div>
);

export default ForumCard;
