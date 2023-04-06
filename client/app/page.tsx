'use client';
import { UserContextProvider } from '@/store/context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return <h1 className="text-main-500 text-4xl">Hello world</h1>;
}

// const Providers = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <Provider store={store}>
//       <GoogleOAuthProvider clientId={AppProperty.GOOGLE_CLIENT_ID}>
//         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//       </GoogleOAuthProvider>
//     </Provider>
//   );
// };
