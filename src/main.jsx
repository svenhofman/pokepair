import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/game-screen.css';
import './styles/card.css';
import './styles/main.css';
import './styles/menu-screen.css';
import './styles/end-screen.css';
import './styles/loading-screen.css';
import './styles/error-screen.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
