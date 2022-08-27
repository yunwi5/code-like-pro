import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ExerciseCreationPage from './pages/exercise-pages/ExerciseCreation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ExerciseAttemptPage from './pages/exercise-pages/ExerciseAttemptPage';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create-exercise" element={<ExerciseCreationPage />} />
                <Route path="/exercise/:id" element={<ExerciseAttemptPage />} />
            </Routes>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
