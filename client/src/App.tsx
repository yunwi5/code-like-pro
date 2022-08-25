import { Route, Routes } from 'react-router-dom';
import ExerciseCreationPage from './pages/exercise-pages/ExerciseCreation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CodeEditorPage from './pages/exercise-pages/ExerciseAttemptPage';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-exercise" element={<ExerciseCreationPage />} />
                <Route path="/exercise/:id" element={<CodeEditorPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
