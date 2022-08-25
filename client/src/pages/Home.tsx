import React from "react";
import { Helmet } from "react-helmet";
import { AppProperty } from "../constants/app";
import Header from "../components/layout/Header";

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
      <Header />
      <div>Home</div>
    </>
  );
};

export default Home;
