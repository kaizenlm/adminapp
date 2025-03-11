import { useState } from 'react'
import FrontLogin from './pages/Login/login.jsx'
import MainMenu from './pages/MainMenu/mainmenu.jsx'
import UserManager from './pages/Usuarios/registrar.jsx'
import Mesas from './pages/Mesas/mesas.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'


// K147593

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FrontLogin />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/registrar" element={<UserManager />} />
        <Route path="/mesas" element={<Mesas />} />
      </Routes>

    </Router>
  )
}


export default App