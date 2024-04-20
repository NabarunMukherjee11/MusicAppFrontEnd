import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactCardSlider from './pages/ReactCartSlider'
import LoginComponent from './pages/Loginpage'
import HomeComponent from './pages/Homepage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path='/homePage' element ={<HomeComponent />}/>
      </Routes>
    </Router>
  );
};

export default App
