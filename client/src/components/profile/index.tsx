import { lazy } from 'react';

const ProfileMain = lazy(() => import('./profile/ProfileMain'));
const ProfileStatistics = lazy(() => import('./statistics/ProfileStatistics'));
const ProfileFavorites = lazy(() => import('./favorites/ProfileFavorites'));
const MyCreations = lazy(() => import('./my-creations/MyCreations'));
const MySubmission = lazy(() => import('./my-submissions/MySubmission'));
const UserBadges = lazy(() => import('./badges/UserBadges'));

export default {
    ProfileMain,
    ProfileFavorites,
    ProfileStatistics,
    MyCreations,
    MySubmission,
    UserBadges,
};
