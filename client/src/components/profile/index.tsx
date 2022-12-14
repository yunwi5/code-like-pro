import { lazy } from 'react';

const ProfileMain = lazy(() => import('./profile/ProfileMain'));
const ProfileStatistics = lazy(() => import('./statistics/ProfileStatistics'));
const ProfileFavorites = lazy(() => import('./favorites/ProfileFavorites'));
const MyCreations = lazy(() => import('./my-creations/MyCreations'));
const MySubmission = lazy(() => import('./my-submissions/MySubmission'));

export default {
    ProfileMain,
    ProfileFavorites,
    ProfileStatistics,
    MyCreations,
    MySubmission,
};
