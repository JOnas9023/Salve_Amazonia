import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Configuração de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Pet Rescue Platform - Modo Desenvolvimento');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
