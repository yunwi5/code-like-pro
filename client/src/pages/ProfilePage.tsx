import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation } from 'react-router-dom';

import ProfileNav from '../components/profile/ProfileNav';
import useAuth from '../hooks/useAuth';
import { AppProperty } from '../constants/app';
import { ProfileSection } from '../models/enums';

const ProfilePage: React.FC = () => {
    useAuth();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(ProfileSection.PROFILE);

    useEffect(() => {
        const section = getActiveProfileSection(location.pathname);
        setActiveSection(section);
    }, [location.pathname]);

    return (
        <>
            <Helmet>
                <title>Profile | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content="User profile page for programming exercise progress tracking"
                />
            </Helmet>
            <main className="min-h-[82.5vh] py-10 flex-center flex-col text-gray-700">
                <div className="mx-auto w-[100vw] md:w-[90vw] lg:w-[80vw] xl:w-[77vw]">
                    <h1 className="mb-3 text-gray-600 text-3xl self-start">{activeSection}</h1>
                    <div className="flex md:bg-gray-50 rounded-md overflow-hidden md:shadow-md">
                        <ProfileNav />
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

function getActiveProfileSection(pathname: string) {
    if (pathname.includes('statistics')) return ProfileSection.STATISTICS;
    if (pathname.includes('favorites')) return ProfileSection.FAVORITES;
    if (pathname.includes('creation')) return ProfileSection.MY_CREATIONS;
    if (pathname.includes('submission')) return ProfileSection.MY_SUBMISSIONS;
    return ProfileSection.PROFILE;
}

export default ProfilePage;
