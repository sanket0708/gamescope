import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar/Navbar';
import Games from './components/Games/Games';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Wishlist from './components/Wishlist/Wishlist';

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <div className='min-h-screen bg-gray-100'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </WishlistProvider>
  );
};

export default App;