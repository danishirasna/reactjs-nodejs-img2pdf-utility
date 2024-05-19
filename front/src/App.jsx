// src/App.jsx
import React from 'react';
import './index.scss';
import './index.css';
import AppRouter from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
