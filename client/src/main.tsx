import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UserContextProvider } from './store/context/UserContext';
import store from './store/redux/store';
import App from './App';
import './styles/index.scss';

// React Query client initialization
// Provide ReactQuery client, so that all child components could use React Query for data fetching.
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <Router>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </Router>
        </QueryClientProvider>
    </Provider>,
);
