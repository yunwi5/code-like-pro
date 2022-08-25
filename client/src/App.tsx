import { Route, Routes } from 'react-router-dom';
import ExerciseCreation from './pages/exercise-pages/ExerciseCreation';
import Home from './pages/Home';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
    return (
        <>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-exercise" element={<ExerciseCreation />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
