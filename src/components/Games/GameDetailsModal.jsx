import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { WishlistContext } from '../../context/WishlistContext';

const GameDetailsModal = ({ game, onClose }) => {
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';

    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`, {
          params: { id: game.id },
          headers: {
            'x-rapidapi-key': 'cddd97d10bmshb173db3d405a0ffp178473jsn0a4c87c0eda9',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
        });
        setGameDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameDetails();

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [game.id]);

  // Function to truncate description
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleClose = () => {
    document.body.style.overflow = 'unset';
    onClose();
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-blue-500 text-lg"
        >
          Loading game details...
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-hidden"
        onClick={handleClose}
      >
        {/* Blurred Background */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ type: "tween" }}
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-70" 
          style={{ 
            backgroundImage: `url(${gameDetails.thumbnail})`,
            transform: 'scale(1.2)' 
          }}
        />

        {/* Modal Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div 
          initial={{ 
            scale: 0.9, 
            opacity: 0, 
            y: 50 
          }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0 
          }}
          exit={{ 
            scale: 0.9, 
            opacity: 0, 
            y: 50 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className="bg-white bg-opacity-90 rounded-xl w-full md:w-[80%] lg:w-[80%] max-w-6xl h-full md:h-[90%] lg:h-[80%] overflow-y-auto relative shadow-2xl z-10 flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 bg-white bg-opacity-50 rounded-full p-2 transition-all duration-300 hover:bg-opacity-80 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full overflow-y-auto">
            {/* Game Images */}
            <div className="flex flex-col">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                src={gameDetails.thumbnail} 
                alt={gameDetails.title} 
                className="w-full h-48 sm:h-64 md:h-64 lg:h-96 object-cover rounded-xl mb-4 shadow-lg"
              />
              {gameDetails.screenshots && gameDetails.screenshots.length > 0 && (
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {gameDetails.screenshots.slice(0, 6).map((screenshot, index) => (
                    <motion.img 
                      key={index} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      src={screenshot.image} 
                      alt={`${gameDetails.title} screenshot ${index + 1}`} 
                      className="w-full h-20 sm:h-24 md:h-24 lg:h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              )}

              {/* Play Now and Wishlist Buttons */}
              <div className="flex space-x-4 mt-4">
                <motion.a 
                  href={gameDetails.game_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-center font-bold text-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Play Now
                </motion.a>
                
                <motion.button
                  onClick={() => {
                    console.log('Adding game to wishlist:', gameDetails);
                    addToWishlist(gameDetails);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`p-3 cursor-pointer rounded-lg transition-colors duration-300 ${
                    isInWishlist(gameDetails.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isInWishlist(gameDetails.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Game Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
                  {gameDetails.title}
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                  {showFullDescription 
                    ? gameDetails.description 
                    : truncateDescription(gameDetails.description, 250)
                  }
                  {!showFullDescription && gameDetails.description.length > 250 && (
                    <span 
                      onClick={() => setShowFullDescription(true)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer ml-2 font-semibold"
                    >
                      Read More
                    </span>
                  )}
                </p>

                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                  <div className="bg-gray-100 p-2 md:p-4 rounded-lg">
                    <h3 className="font-bold text-xs md:text-sm text-gray-600 mb-1 uppercase tracking-wider">Genre</h3>
                    <p className="text-sm md:text-base text-gray-800 font-semibold">{gameDetails.genre}</p>
                  </div>
                  <div className="bg-gray-100 p-2 md:p-4 rounded-lg">
                    <h3 className="font-bold text-xs md:text-sm text-gray-600 mb-1 uppercase tracking-wider">Platform</h3>
                    <p className="text-sm md:text-base text-gray-800 font-semibold">{gameDetails.platform}</p>
                  </div>
                  <div className="bg-gray-100 p-2 md:p-4 rounded-lg">
                    <h3 className="font-bold text-xs md:text-sm text-gray-600 mb-1 uppercase tracking-wider">Publisher</h3>
                    <p className="text-sm md:text-base text-gray-800 font-semibold">{gameDetails.publisher}</p>
                  </div>
                  <div className="bg-gray-100 p-2 md:p-4 rounded-lg">
                    <h3 className="font-bold text-xs md:text-sm text-gray-600 mb-1 uppercase tracking-wider">Developer</h3>
                    <p className="text-sm md:text-base text-gray-800 font-semibold">{gameDetails.developer}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-auto">
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameDetailsModal;
