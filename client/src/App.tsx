import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ExerciseCreationPage from './pages/exercise-pages/ExerciseCreation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ExerciseAttemptPage from './pages/exercise-pages/ExerciseAttemptPage';
import BrowsingPage from './pages/exercise-pages/BrowsingPage';

// React Query client initialization
const queryClient = new QueryClient();

function App() {
    return (
        // Provide ReactQuery client, so that all child components could use React Query for data fetching
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Header />
                <Routes>
                    {/* Home page */}
                    <Route path="/" element={<HomePage />} />

                    {/* Auth pages login & register */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Exercise pages */}
                    <Route path="/create-exercise" element={<ExerciseCreationPage />} />
                    <Route path="/browse" element={<BrowsingPage />} />
                    <Route path="/exercise/:id" element={<ExerciseAttemptPage />} />
                </Routes>
                <Footer />

                {/* Toast notification placement */}
                <ToastContainer />
            </div>
        </QueryClientProvider>
    );
}

export default App;
