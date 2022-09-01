import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ClimbingBoxLoader } from 'react-spinners';

// Layout component imports
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy loading imports. Higher performance for initial page loading.
const ExerciseCreationPage = lazy(() => import('./pages/exercise-pages/ExerciseCreation'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ExerciseAttemptPage = lazy(() => import('./pages/exercise-pages/ExerciseAttemptPage'));
const BrowsingPage = lazy(() => import('./pages/exercise-pages/BrowsingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Profile nested pages are also lazy loaded.
import ProfilePages from './components/profile';
const { ProfileMain, ProfileFavorites, ProfileStatistics, MyCreations, MySubmission } =
    ProfilePages;

function App() {
    return (
        <div className="App">
            <Header />
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    {/* Home page */}
                    <Route path="/" element={<HomePage />} />

                    {/* Auth pages login & register */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* User profile pages */}
                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="" element={<ProfileMain />} />
                        <Route path="statistics" element={<ProfileStatistics />} />
                        <Route path="favorites" element={<ProfileFavorites />} />
                        <Route path="my-creations" element={<MyCreations />} />
                        <Route path="my-submissions" element={<MySubmission />} />
                    </Route>

                    {/* Exercise pages */}
                    <Route path="/create-exercise" element={<ExerciseCreationPage />} />
                    <Route path="/browse" element={<BrowsingPage />} />
                    <Route path="/exercise/:id" element={<ExerciseAttemptPage />} />

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

const LoadingFallback: React.FC = () => {
    return (
        <div className="min-h-[82.5vh] flex-center">
            <ClimbingBoxLoader size={65} color="#5552e4" />
        </div>
    );
};

export default App;
