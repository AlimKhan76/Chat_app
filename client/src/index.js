import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = "https://chat-app-ark2-alimkhan76s-projects.vercel.app";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

