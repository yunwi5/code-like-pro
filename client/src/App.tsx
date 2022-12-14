import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

// Profile nested pages
import ProfilePages from './components/profile';
import ForumPages from './components/forum';
import { useUserContext } from './store/context/UserContext';

// Lazy loading imports. Higher performance for initial page loading.
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ExerciseCreationPage = lazy(() => import('./pages/exercise/ExerciseCreationPage'));
const ExerciseEditPage = lazy(() => import('./pages/exercise/ExerciseEditPage'));
const ExerciseAttemptPage = lazy(() => import('./pages/exercise/ExerciseAttemptPage'));
const BrowsingPage = lazy(() => import('./pages/exercise/BrowsingPage'));
const ShowcasePage = lazy(() => import('./pages/exercise/ShowcasePage'));
const ShowcaseInvitesPage = lazy(() => import('./pages/exercise/ShowcaseInvitesPage'));
const ForumsPage = lazy(() => import('./pages/forum/ForumsPage'));
const ForumCategoryPage = lazy(() => import('./pages/forum/ForumCategoryPage'));
const PostCreatePage = lazy(() => import('./pages/forum/PostCreationPage'));
const PostEditPage = lazy(() => import('./pages/forum/PostEditPage'));
const RankingPage = lazy(() => import('./pages/ranking/RankingPage'));
const TopicRankingPage = lazy(() => import('./pages/ranking/TopicRankingPage'));

const { ProfileMain, ProfileFavorites, ProfileStatistics, MyCreations, MySubmission } =
    ProfilePages;
const { PostDetail } = ForumPages;

function App() {
    const { user } = useUserContext();
    const isLoggedIn = !!user;

    return (
        <div className="App">
            <Header />
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    {/* Home page */}
                    <Route path="/" element={<HomePage />} />

                    {/* Auth pages login & register. Do not show if the user is already logged in. */}
                    {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
                    {!isLoggedIn && <Route path="/register" element={<RegisterPage />} />}

                    {/* User profile pages */}
                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="" element={<ProfileMain />} />
                        <Route path="statistics" element={<ProfileStatistics />} />
                        <Route path="favorites" element={<ProfileFavorites />} />
                        <Route path="my-creations" element={<MyCreations />} />
                        <Route path="my-submissions" element={<MySubmission />} />
                    </Route>

                    {/* Exercise pages */}
                    <Route path="/browse" element={<BrowsingPage />} />
                    <Route path="/create-exercise" element={<ExerciseCreationPage />} />
                    <Route path="/edit-exercise/:id" element={<ExerciseEditPage />} />
                    <Route path="/exercise/:id" element={<ExerciseAttemptPage />} />
                    <Route path="/showcase/:id" element={<ShowcasePage />} />

                    {/* Showcase invites page listing showcase options available for the user. */}
                    <Route path="/showcase-invites" element={<ShowcaseInvitesPage />} />

                    {/* Ranking pages */}
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/ranking/topic/:topic" element={<TopicRankingPage />} />

                    {/* Global discussion forum pages */}
                    <Route path="/forum" element={<ForumsPage />} />
                    <Route path="/forum/:category" element={<ForumCategoryPage />}>
                        <Route path=":id" element={<PostDetail />} />
                    </Route>
                    <Route path="/create-post" element={<PostCreatePage />} />
                    <Route path="/edit-post/:id" element={<PostEditPage />} />

                    {/* Undefined routes redirect to the home page */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
            <Footer />

            {/* Toast notification placement */}
            <ToastContainer />
        </div>
    );
}

// Loading spinner to be shown when the page is loading.
const LoadingFallback: React.FC = () => {
    return (
        <div className="min-h-[83.5vh] flex-center">
            <ClimbingBoxLoader size={65} color="#5552e4" />
        </div>
    );
};

export default App;
