import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ClimbingBoxLoader } from 'react-spinners';

// Layout component imports
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// Profile nested pages
import ProfilePages from './components/profile';
import ShowcasePage from './pages/exercise-pages/ShowcasePage';
import { useUserContext } from './store/context/UserContext';

// Lazy loading imports. Higher performance for initial page loading.
const ExerciseCreationPage = lazy(() => import('./pages/exercise-pages/ExerciseCreationPage'));
const ExerciseEditPage = lazy(() => import('./pages/exercise-pages/ExerciseEditPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ExerciseAttemptPage = lazy(() => import('./pages/exercise-pages/ExerciseAttemptPage'));
const BrowsingPage = lazy(() => import('./pages/exercise-pages/BrowsingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const { ProfileMain, ProfileFavorites, ProfileStatistics, MyCreations, MySubmission } =
    ProfilePages;

function App() {
    const { user, loginBySession } = useUserContext();
    const isLoggedIn = !!user;

    // When the user refreshes the page, login the user on the client side with the stored session.
    useEffect(() => {
        loginBySession();
    }, [loginBySession]);

    return (
        <div className="App">
            <Header />
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
