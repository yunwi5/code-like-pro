import React from "react";
import { Helmet } from "react-helmet";
import { AppProperty } from "../../constants/app";
import AuthCard from "../../components/auth/AuthCard";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | {AppProperty.APP_NAME}</title>
        <meta
          name="description"
          content={`Login page of ${AppProperty.APP_NAME} where users can log into their accounts.`}
        />
      </Helmet>
      <main className="flex justify-center h-[80vh] px-3 md:px-5 xl:px-10 py-10 text-gray-700">
        <AuthCard isLogin={true}></AuthCard>
      </main>
    </>
  );
};

export default LoginPage;
