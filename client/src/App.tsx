import { Route, Routes } from "react-router-dom";
import { AppProperty } from "./constants/app";
import ExerciseCreation from "./pages/exercise-pages/ExerciseCreation";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-exercise" element={<ExerciseCreation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
