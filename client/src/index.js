import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL = "https://chat-app-ruby-gamma-89.vercel.app";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

