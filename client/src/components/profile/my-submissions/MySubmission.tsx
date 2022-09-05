import React from 'react';
import { useUserContext } from '../../../store/context/UserContext';
import ProfileLoader from '../ProfileLoader';

const MySubmission: React.FC = () => {
    const { userDetail } = useUserContext();
    const submissions = userDetail?.submissions;

    // Loading state
    if (!submissions) return <ProfileLoader />;

    return <div>MySubmission</div>;
};

export default MySubmission;
