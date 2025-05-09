import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left - Logo and App Name */}
          <div className="flex items-center">
            <Brand />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 mt-5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/" className="group px-3 py-2 rounded-md text-sm font-medium">
              <span className="relative text-xl text-black hover:text-gray-400">
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </span>
            </Link>
            <Link to="/games" className="group px-3 py-2 rounded-md text-sm font-medium">
              <span className="relative text-xl text-black hover:text-gray-400">
                All Games
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className={`sm:hidden absolute top-full left-0 right-0 backdrop-blur-sm ${isOpen ? 'block' : 'hidden'}`}>
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Brand = () => {
  return (
    <div className="flex items-center cursor-pointer" onClick={goToHome}>
      <img
        src="/src/assets/joyf3.png"
        alt="GameScope Logo"
        className="h-10 w-12 mr-2 mt-5"
      />
    </div>
  );
};

const goToHome = () => {
  window.location.href = '/';
};

export default Navbar;