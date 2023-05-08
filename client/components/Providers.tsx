'use client';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as BalancerProvider } from 'react-wrap-balancer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProperty } from '@/constants';
import { UserContextProvider } from '@/store/context/UserContext';
import store from '@/store/redux/store';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={AppProperty.GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <BalancerProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </BalancerProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
      <ToastContainer />
    </ReduxProvider>
  );
};

export default Providers;
