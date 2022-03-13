import React, { useState } from 'react'
import './App.css'
import User from './components/User/User'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome'
import Topbar from './components/Topbar/Topbar';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Protected from './components/Auth/Protected'
import CreateFlashcard from './components/Flashcard/CreateFlashcard'
import AuthProvider from './components/Auth/AuthProvider'

function App() {
  const [createMode, setCreateMode] = useState(false)
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Topbar createMode={createMode} createCardHandler={() => { setCreateMode(!createMode) }} />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Protected><CreateFlashcard /></Protected>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App;
