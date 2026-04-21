import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'css-doodle'; // Registers <css-doodle> as a global web component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
