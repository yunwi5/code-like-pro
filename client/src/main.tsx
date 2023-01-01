import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { UserContextProvider } from './store/context/UserContext';
import store from './store/redux/store';
import { AppProperty } from './constants/app';
import App from './App';
import './styles/index.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={AppProperty.GOOGLE_CLIENT_ID}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UserContextProvider>
                        <App />
                    </UserContextProvider>
                </Router>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </Provider>,
);
