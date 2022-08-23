import { Route, Routes } from 'react-router-dom';
import { AppProperty } from './constants/app';
import ExerciseCreation from './pages/exercise-pages/ExerciseCreation';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl text-main-500 text-center">
                    Welcome to {AppProperty.APP_NAME}
                </h1>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-exercise" element={<ExerciseCreation />} />
            </Routes>
        </div>
    );
}

export default App;
