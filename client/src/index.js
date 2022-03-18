import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css';
import Welcome from './components/Welcome/Welcome'
import App from './App';
import Topbar from './components/Topbar/Topbar';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Protected from './components/Auth/Protected'
import CreateFlashcard from './components/Flashcard/CreateFlashcard'
import AuthProvider from './components/Auth/AuthProvider'
import User from './components/User/User'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Topbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/user" element={<Protected><User /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<Protected><App /></Protected>} />
          <Route path="/create" element={<Protected><CreateFlashcard /></Protected>} />
        </Routes>
      </AuthProvider>
    </ BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
