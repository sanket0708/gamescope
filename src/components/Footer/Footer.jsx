// src/components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          {/* About Section */}
          <div className="space-y-6 max-sm:text-center">
            <h3 className="text-xl font-bold mb-4">GameScope</h3>
            <p className="text-gray-400">
              Discover and explore free-to-play games from around the world.
            </p>
            <div className="flex space-x-4 mt-6 max-sm:justify-center">
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="h-6 w-6 hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="h-6 w-6 hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="h-6 w-6 hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.749 0 8.333.015 7.053.073 3.304.267.867 4.053.867 8.583c0 4.524 3.443 7.968 8.185 7.968.378 0 .756-.038 1.128-.074v1.338c-.43.205-1.04.313-1.706.313-1.312 0-2.39-1.162-2.39-2.633 0-.616.163-1.217.44-1.714A23.995 23.995 0 0112 15.733c2.39 0 4.418 1.582 5.163 3.88.177.497.44 1.1 1.266 1.715a2.97 2.97 0 01.438.074V16.5c0-.667-.917-1.23-1.707-1.23-1.312 0-2.39 1.162-2.39 2.633 0 1.802 1.27 3.372 3.054 3.815a.42.42 0 01.12.243l-.342 1.365C16.446 23.876 14.485 24 12.018 24c-4.417 0-8.184-3.444-8.184-7.969 0-4.524 3.443-7.968 8.185-7.968.378 0 .755-.038 1.128-.074V4.267c-.43.205-1.04.313-1.706.313-1.312 0-2.39-1.162-2.39-2.633 0-1.47.988-2.633 2.39-2.633.654 0 1.278.074 1.89.187l1.47-.588C13.688.13 14.265 0 14.951 0h.049zM12 2.117c-1.804 0-3.273 1.469-3.273 3.273 0 1.47.989 2.634 2.39 2.634.654 0 1.278-.074 1.89-.187l1.47.588c-.812.363-1.738.589-2.748.589-3.007 0-5.46-2.453-5.46-5.46 0-3.007 2.453-5.46 5.46-5.46 2.225 0 4.238 1.31 5.146 3.093l1.107-.44c-.91-2.04-3.04-3.093-5.413-3.093z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Gaming Quote */}
          <div className="text-center">
            <div className="relative">
              <blockquote className="text-2xl md:text-3xl font-medium italic text-gray-400 mb-4">
                <span className="text-blue-500">"</span>
                Gaming is not just about winning or losing. It's about the journey, the challenges, and the moments of pure joy.
                <span className="text-blue-500">"</span>
              </blockquote>
              <p className="text-sm text-gray-400">- A True Gamer</p>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col sm:flex pb-3 justify-between items-center">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} GameScope. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;