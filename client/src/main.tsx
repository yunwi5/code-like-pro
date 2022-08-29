import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Router>
        <App />
    </Router>,
    // </React.StrictMode>
);
