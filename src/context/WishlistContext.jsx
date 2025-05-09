import React, { createContext, useState, useEffect, useCallback } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Initialize state from localStorage on first render
    try {
      const savedWishlist = localStorage.getItem('gameWishlist');
      console.log('Initial localStorage wishlist:', savedWishlist);
      
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        console.log('Parsed initial wishlist:', parsedWishlist);
        return parsedWishlist;
      }
      return [];
    } catch (error) {
      console.error('Error loading initial wishlist:', error);
      return [];
    }
  });

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log('Updating localStorage with wishlist:', wishlist);
      localStorage.setItem('gameWishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist]);

  // Robust add to wishlist function
  const addToWishlist = useCallback((game) => {
    if (!game || !game.id) {
      console.error('Invalid game object:', game);
      return;
    }

    setWishlist(currentWishlist => {
      // Check if game is already in wishlist
      const isAlreadyInWishlist = currentWishlist.some(item => item.id === game.id);
      
      if (isAlreadyInWishlist) {
        // Remove from wishlist if already present
        const updatedWishlist = currentWishlist.filter(item => item.id !== game.id);
        console.log('Removing game from wishlist:', game);
        return updatedWishlist;
      } else {
        // Add to wishlist
        console.log('Adding game to wishlist:', game);
        return [...currentWishlist, game];
      }
    });
  }, []);

  // Function to clear wishlist (for debugging)
  const clearWishlist = useCallback(() => {
    console.log('Clearing entire wishlist');
    setWishlist([]);
    localStorage.removeItem('gameWishlist');
  }, []);

  // Check if a game is in wishlist
  const isInWishlist = useCallback((gameId) => {
    return wishlist.some(item => item.id === gameId);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      isInWishlist,
      clearWishlist // Expose for potential debugging
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
