import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProfileLayoutContainer from '@/components/profile/containers/ProfileLayoutContainer';
import { AppProperty } from '@/constants';
import { getProfileSection, ProfileSection, ProfileSectionList } from '@/models/enums';
import { deslugify, slugify } from '@/utils/string-utils/url.util';

const MyProfile = dynamic(() => import('@/components/profile/profile/ProfileMain'));
const Favorites = dynamic(
  () => import('@/components/profile/favorites/ProfileFavorites'),
);
const MyCreations = dynamic(
  () => import('@/components/profile/my-creations/MyCreations'),
);
const MySubmissions = dynamic(
  () => import('@/components/profile/my-submissions/MySubmission'),
);
const Statistics = dynamic(
  () => import('@/components/profile/statistics/ProfileStatistics'),
);

type ProfilePageProps = {
  params: { section: string };
};

export async function generateMetadata({
  params: { section: sectionParam },
}: ProfilePageProps): Promise<Metadata> {
  const section = deslugify(sectionParam);

  return {
    title: `${section} | ${AppProperty.APP_NAME}`,
    description: `Profile page for a section ${section}, where users can browse their profile, favorites, creations, submissions and statistics.`,
  };
}

export async function generateStaticParams() {
  return ProfileSectionList.map((section) => ({ section: slugify(section) }));
}

function ProfilePage({ params: { section: sectionParam } }: ProfilePageProps) {
  const profileSection = getProfileSection(deslugify(sectionParam));
  if (profileSection == null) {
    notFound();
  }

  return (
    <ProfileLayoutContainer activeSection={profileSection}>
      {mapProfileSectionToComponent(profileSection)}
    </ProfileLayoutContainer>
  );
}

function mapProfileSectionToComponent(section: ProfileSection) {
  if (section === ProfileSection.MY_PROFILE) {
    return <MyProfile />;
  } else if (section === ProfileSection.FAVORITES) {
    return <Favorites />;
  } else if (section === ProfileSection.MY_CREATIONS) {
    return <MyCreations />;
  } else if (section === ProfileSection.MY_SUBMISSIONS) {
    return <MySubmissions />;
  }
  return <Statistics />;
}

export default ProfilePage;
