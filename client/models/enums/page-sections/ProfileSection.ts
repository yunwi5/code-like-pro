export enum ProfileSection {
  MY_PROFILE = 'My Profile',
  STATISTICS = 'Statistics',
  FAVORITES = 'Favorites',
  MY_CREATIONS = 'My Creations',
  MY_SUBMISSIONS = 'My Submissions',
}

export const ProfileSectionList = Object.freeze(Object.values(ProfileSection));

export const getProfileSection = (section: string) => {
  return ProfileSectionList.find((s) => s.toLowerCase() === section.toLowerCase());
}