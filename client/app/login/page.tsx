import React from 'react';
import { NextPage } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Login | ${AppProperty.APP_NAME}`,
  description: `Login page of ${AppProperty.APP_NAME} where users can log into their accounts.`,
};

const page: NextPage = () => {
  return (
    <main className="flex-center lg:gap-8 xl:gap-[7.5%] mb-6 min-h-[max(85vh,35rem)] px-3 md:px-5 xl:px-10 py-16 text-gray-700">
      <LoginForm />
    </main>
  );
};

export default page;
