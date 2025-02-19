import { useState } from 'react'
import FrontLogin from './components/frontlogin/frontlogin.jsx'
import MainMenu from './components/frontmainmenu/frontmainmenu.jsx'
import UserManager from './components/frontregistrar/frontregistrar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'


// K147593

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FrontLogin />} />
        <Route path="/registrar" element={<UserManager />} />
        <Route path="/menu" element={<MainMenu />} />
      </Routes>

    </Router>
  )
}


export default App