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
            <main className="min-h-[82.5vh] pt-10 pb-20 flex-center flex-col text-gray-700">
                {/* Different width configuration for different screen sizes. */}
                <div className="mx-auto w-[100vw] sm:w-[95vw] md:w-[92.5vw] lg:w-[90vw] xl:w-[85vw] 2xl:w-[80vw] 3xl:w-[75vw]">
                    <h1 className="hidden sm:block mb-3 pl-2 sm:pl-0 text-gray-600 text-3xl self-start">
                        {activeSection}
                    </h1>
                    <div className="flex flex-col lg:flex-row sm:bg-gray-50 rounded-md overflow-hidden sm:shadow-md">
                        <ProfileNav activeSection={activeSection} />
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
