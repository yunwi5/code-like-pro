import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { AppProperty } from "../constants/app";
import HeroLanding from "../components/home/HeroLanding";
import Carousel from "../components/home/Carousel";

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home | {AppProperty.APP_NAME}</title>
        <meta
          name="description"
          content={`Home page of ${AppProperty.APP_NAME} where users can see detailed information about programming exercises on the website.`}
        />
      </Helmet>
      <HeroLanding />
      <Carousel />
    </>
  );
};

export default Home;
