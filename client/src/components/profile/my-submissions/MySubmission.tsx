import React, { useMemo, useState } from 'react';

import { SearchKey } from '../../../models/enums';
import { useUserContext } from '../../../store/context/UserContext';
import { searchIncludes } from '../../../utils/search';
import Searchbar from '../../ui/inputs/Searchbar';
import SubmissionList from '../../ui/lists/SubmissionList';
import ProfileSectionContainer from '../containers/ProfileSectionContainer';
import ProfileLoader from '../ProfileLoader';

const MySubmission: React.FC = () => {
    const { userDetail } = useUserContext();
    const submissions = userDetail?.submissions;
    const [searchText, setSearchText] = useState('');

    // Loading state
    if (!submissions) return <ProfileLoader />;

    const searchedSubmissions = useMemo(() => {
        return submissions.filter((sub) => searchIncludes(sub.exercise.name, searchText));
    }, [submissions, searchText]);

    return (
        <ProfileSectionContainer>
            <nav className="flex-between !items-end mb-6">
                <Searchbar
                    onKeyChange={() => {}}
                    onTextChange={(text) => setSearchText(text)}
                    keyValue={SearchKey.TITLE}
                    textValue={searchText}
                    searchKeys={[SearchKey.TITLE]}
                    label={null}
                />
                <h2 className="text-gray-500 font-semibold text-xl">
                    {searchedSubmissions.length} Submissions
                </h2>
            </nav>
            <SubmissionList submissions={searchedSubmissions} />
        </ProfileSectionContainer>
    );
};

export default MySubmission;
