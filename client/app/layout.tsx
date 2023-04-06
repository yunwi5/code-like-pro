import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from '@/store/context/UserContext';
import store from '@/store/redux/store';
import { AppProperty } from '@/constants/app';
import '../styles/global.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '@/components/utils/ScrollToTop';

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
          <ScrollToTop />
        </body>
      </html>
    </Providers>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={AppProperty.GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>{children}</UserContextProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default RootLayout;
