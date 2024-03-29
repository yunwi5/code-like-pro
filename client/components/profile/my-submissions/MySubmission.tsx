'use client';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { SearchKey } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { searchIncludes } from '../../../utils/search.util';
import { compareByDateTime } from '../../../utils/sorting-utils';
import Searchbar from '../../ui/inputs/Searchbar';
import SubmissionList from '../../ui/lists/SubmissionList';
import ProfileSectionContainer from '../containers/ProfileSectionContainer';
import ProfileLoader from '../ProfileLoader';

const MySubmission: React.FC = () => {
  const { userDetail } = useUserContext();
  const submissions = userDetail?.submissions;
  const [searchText, setSearchText] = useState('');

  const searchedSubmissions = useMemo(() => {
    return (submissions ?? []).filter((sub) => searchIncludes(sub.exercise.name, searchText));
  }, [submissions, searchText]);

  const sortedSubmissions = useMemo(() => {
    return searchedSubmissions
      .sort((subA, subB) => compareByDateTime(subB.postedAt, subA.postedAt))
      .slice();
  }, [searchedSubmissions]);

  if (!submissions) return <ProfileLoader />;

  const handleSearch = (searchKey: string, text: string) => {
    setSearchText(text);
  };

  return (
    <ProfileSectionContainer>
      <motion.nav
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
        className="flex flex-col sm:flex-row justify-between sm:items-end gap-y-4 mb-6"
      >
        <Searchbar
          defaultSearchKey={SearchKey.TITLE}
          searchKeys={[SearchKey.TITLE]}
          label={null}
          onSearch={handleSearch}
        />
        <h2 className="text-gray-500 font-semibold text-xl">
          {sortedSubmissions.length} Submissions
        </h2>
      </motion.nav>
      <SubmissionList submissions={sortedSubmissions} />
    </ProfileSectionContainer>
  );
};

export default MySubmission;
