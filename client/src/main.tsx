import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/redux/store';

import App from './App';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    // </React.StrictMode>
);
