import { Route, Routes } from "react-router-dom";
import { AppProperty } from "./constants/app";
import ExerciseCreation from "./pages/exercise-pages/ExerciseCreation";
import Home from "./pages/Home";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-exercise" element={<ExerciseCreation />} />
      </Routes>
    </div>
  );
}

export default App;
