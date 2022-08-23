import { Route, Routes } from 'react-router-dom';
import { AppProperty } from './constants/app';
import ExerciseCreation from './pages/exercise-pages/ExerciseCreation';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-exercise" element={<ExerciseCreation />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
