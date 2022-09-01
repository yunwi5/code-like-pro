import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import ProfileNav from '../components/profile/ProfileNav';
import { AppProperty } from '../constants/app';

const ProfilePage: React.FC = () => {
    // Fetch user info
    // useQuery(['user']);

    return (
        <>
            <Helmet>
                <title>Profile | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="User profile page for programming exercise progress tracking"
                />
            </Helmet>
            <main className="min-h-[82.5vh] flex-center text-gray-700">
                <div className="flex m-auto w-[100vw] md:w-[90vw] lg:w-[80vw] xl:w-[77vw] md:bg-gray-50 rounded-md overflow-hidden md:shadow-md">
                    <ProfileNav />
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default ProfilePage;
