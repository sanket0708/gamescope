import React, { useContext, useEffect } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlist, addToWishlist, clearWishlist } = useContext(WishlistContext);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []); // Empty dependency array means this runs once on mount

  // Debug logging
  useEffect(() => {
    console.log('Wishlist contents:', wishlist);
    console.log('Number of games in wishlist:', wishlist.length);
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center sm:text-left w-full sm:w-auto">
            My Wishlist
          </h1>
          
          {/* Debug button to clear wishlist - only show if there are items */}
          {wishlist.length > 0 && (
            <button 
              onClick={clearWishlist}
              className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-full sm:w-auto"
            >
              Clear Wishlist
            </button>
          )}
        </div>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-24 w-24 mx-auto text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <p className="text-xl text-gray-600">Your wishlist is empty</p>
            <p className="text-gray-500 mt-2">Add some games to your wishlist!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img 
                  src={game.thumbnail} 
                  alt={game.title} 
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-2 truncate">
                    {game.title}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600 truncate">
                      {game.genre}
                    </span>
                    <button
                      onClick={() => addToWishlist(game)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 sm:h-6 sm:w-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
