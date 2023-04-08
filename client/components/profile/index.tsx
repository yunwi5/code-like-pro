import dynamic from 'next/dynamic';

export const ProfileMain = dynamic(() => import('./profile/ProfileMain'));
export const ProfileStatistics = dynamic(() => import('./statistics/ProfileStatistics'));
export const ProfileFavorites = dynamic(() => import('./favorites/ProfileFavorites'));
export const MyCreations = dynamic(() => import('./my-creations/MyCreations'));
export const MySubmission = dynamic(() => import('./my-submissions/MySubmission'));
