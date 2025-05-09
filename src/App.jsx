import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Games from './components/Games/Games';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;