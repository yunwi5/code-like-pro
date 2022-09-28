import React from "react";
import { Logo } from "../../assets";
import { Link } from "react-router-dom";
import "../../styles/typewriter.css";

const HeroLanding: React.FC = () => {
  return (
    <section className="h-[80vh] w-full flex-center flex-col">
      <div className="opacity-20 absolute">
        <Logo size={500} />
      </div>
      <div>
        <h1 className="typewriter text-text-main-500 text-4xl">
          Programming exercises created for students by students
        </h1>
      </div>
      <div className="w-[70vw] flex-center m-6">
        <h2 className="opacity-80">
          A practice website for programming students where the exercises
          themselves are created by the students.
        </h2>
      </div>
    </section>
  );
};

export default HeroLanding;
