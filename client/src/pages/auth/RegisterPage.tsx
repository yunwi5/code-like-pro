import React from "react";
import { Helmet } from "react-helmet";
import { AppProperty } from "../../constants/app";
import AuthCard from "../../components/auth/AuthCard";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register | {AppProperty.APP_NAME}</title>
        <meta
          name="description"
          content={`Registration page of ${AppProperty.APP_NAME} where users can create a new account.`}
        />
      </Helmet>
      <main className="flex justify-center h-[80vh] px-3 md:px-5 xl:px-10 py-10 text-gray-700">
        <AuthCard isLogin={false}></AuthCard>
      </main>
    </>
  );
};

export default RegisterPage;
