'use client';
import { AppProperty } from '@/constants';
import { UserContextProvider } from '@/store/context/UserContext';
import store from '@/store/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={AppProperty.GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>{children}</UserContextProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
      <ToastContainer />
    </Provider>
  );
};

export default Providers;
