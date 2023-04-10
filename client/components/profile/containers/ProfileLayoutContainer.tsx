import React, { FC } from 'react';
import { ProfileSection } from '@/models/enums';
import ProfileNav from '../nav/ProfileNav';

type ProfileLayoutContainerProps = {
  activeSection: ProfileSection;
  children: React.ReactNode;
};

const ProfileLayoutContainer: FC<ProfileLayoutContainerProps> = ({
  activeSection,
  children,
}) => {
  return (
    <>
      <h1 className="hidden sm:block mb-3 pl-2 sm:pl-0 text-gray-600 text-3xl self-start">
        {activeSection}
      </h1>
      <div className="flex flex-col lg:flex-row sm:bg-gray-50 rounded-md sm:shadow-md">
        <ProfileNav activeSection={activeSection} />
        {children}
      </div>
    </>
  );
};

export default ProfileLayoutContainer;
