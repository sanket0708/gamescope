import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist } = useContext(WishlistContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left - Logo and App Name */}
          <div className="flex items-center">
            <Brand />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            {/* Wishlist Icon for Mobile */}
            <Link to="/wishlist" className="mr-4 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/" className="group px-3 py-2 rounded-md text-sm font-medium">
              <span className="relative text-xl text-gray-200 hover:text-white">
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </span>
            </Link>
            <Link to="/games" className="group px-3 py-2 rounded-md text-sm font-medium">
              <span className="relative text-xl text-gray-200 hover:text-white">
                All Games
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </span>
            </Link>
            
            {/* Wishlist Icon for Desktop */}
            <Link to="/wishlist" className="relative group px-3 py-2 rounded-md text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className={`sm:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/games"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={toggleMenu}
              >
                All Games
              </Link>
              <Link
                to="/wishlist"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={toggleMenu}
              >
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Brand = () => {
  return (
    <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
      <img
        src="/src/assets/joyf3.png"
        alt="GameScope Logo"
        className="h-10 w-12 mr-2"
      />
    </div>
  );
};

export default Navbar;