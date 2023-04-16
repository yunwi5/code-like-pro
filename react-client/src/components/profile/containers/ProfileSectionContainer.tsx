import React from 'react';

const ProfileSectionContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <section className="w-full px-5 xl:px-10 py-10">{children}</section>;
};

export default ProfileSectionContainer;
