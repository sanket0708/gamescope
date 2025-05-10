// src/components/Games/Games.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBar from '../Navbar/SearchBar';
import GameDetailsModal from './GameDetailsModal';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(9);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const pagesToShow = 10;
  const gamesContainerRef = useRef(null);

  const GAME_CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'shooter', label: 'Shooter' },
    { value: 'sports', label: 'Sports' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'racing', label: 'Racing' },
    { value: 'fighting', label: 'Fighting' }
  ];

  const fetchGames = async (page = 1, search = '', category = '') => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: { 
          platform: 'pc'
        },
        headers: {
          'x-rapidapi-key': 'cddd97d10bmshb173db3d405a0ffp178473jsn0a4c87c0eda9',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      
      // Client-side filtering for search and category
      let filteredGames = response.data;
      
      // Log all unique genres for debugging
      const uniqueGenres = [...new Set(filteredGames.map(game => game.genre.toLowerCase()))];
      console.log('Unique Genres:', uniqueGenres);

      if (category) {
        filteredGames = filteredGames.filter(game => {
          const gameGenre = game.genre.toLowerCase();
          const matchesCategory = gameGenre.includes(category.toLowerCase());
          console.log(`Checking game: ${game.title}, Genre: ${gameGenre}, Matches ${category}: ${matchesCategory}`);
          return matchesCategory;
        });
      }
      
      if (search) {
        filteredGames = filteredGames.filter(game => 
          game.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      setGames(filteredGames);
      setTotalPages(Math.ceil(filteredGames.length / itemsPerPage));

      // Set error message if no games found
      if (filteredGames.length === 0) {
        setError(`No games found${search ? ` for "${search}"` : ''}${category ? ` in ${category} category` : ''}. Please try another search.`);
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch games. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(1, searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setCurrentPageGroup(1);
    fetchGames(1, term, selectedCategory);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setCurrentPageGroup(1);
    fetchGames();
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCurrentPage(1);
    setCurrentPageGroup(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchGames(pageNumber, searchTerm, selectedCategory);
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePageGroupChange = (direction) => {
    setCurrentPageGroup(currentPageGroup + direction);
    const newPage = currentPageGroup * pagesToShow + 1;
    setCurrentPage(newPage);
    fetchGames(newPage, searchTerm, selectedCategory);
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGames = games.slice(startIndex, endIndex);

  const startPage = (currentPageGroup - 1) * pagesToShow + 1;
  const endPage = Math.min(currentPageGroup * pagesToShow, totalPages);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16" style={{ marginTop: '3rem' }}>
        <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setSearchTerm('');
            setSelectedCategory('');
            fetchGames();
          }}
          className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Back to All Games
        </button>
      </div>
    );
  }

  const GameCard = ({ game }) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <div 
          onClick={() => setShowModal(true)} 
          className="cursor-pointer group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] flex flex-col"
        >
          <div className="relative overflow-hidden">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2">
              {game.title}
            </h3>
            <p className="text-gray-600 mb-2 sm:mb-3 line-clamp-2 text-xs sm:text-sm flex-grow">
              {game.short_description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                {game.genre} • {game.platform}
              </span>
            </div>
          </div>
        </div>
        {showModal && (
          <GameDetailsModal 
            game={game} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-blue-200 py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4 mb-8 md:mb-12">
          {/* Search Bar Container */}
          <div className="w-full md:flex-grow">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Category Dropdown Container */}
          <div className="w-full md:w-auto mt-2 md:mt-0">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="
                  w-full md:w-48 
                  px-4 py-2.5 
                  pr-8 
                  text-sm 
                  text-gray-700 
                  bg-white 
                  border 
                  border-gray-300 
                  rounded-lg 
                  shadow-sm 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  appearance-none 
                  cursor-pointer 
                  transition-all 
                  duration-300 
                  ease-in-out 
                  hover:bg-gray-50
                "
              >
                {GAME_CATEGORIES.map((category) => (
                  <option 
                    key={category.value} 
                    value={category.value}
                    className="hover:bg-blue-100"
                  >
                    {category.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg 
                  className="fill-current h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {searchTerm && !error && currentGames.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={resetSearch}
              className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
              </svg>
              <span>Back to All Games</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 bg-white rounded-xl shadow-md p-4 md:p-6">
          {currentGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center space-x-1 md:space-x-2 bg-white rounded-xl shadow-md p-2 md:p-4">
          {/* Page groups navigation */}
          <div className="flex items-center space-x-1 md:space-x-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageGroupChange(-1)}
              disabled={currentPageGroup === 1}
              className="px-2 md:px-4 cursor-pointer py-1 md:py-2 text-sm md:text-base rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mr-1 md:mr-4 mb-2"
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from({ length: pagesToShow }, (_, i) => {
              const page = startPage + i;
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 md:px-4 cursor-pointer py-1 md:py-2 text-sm md:text-base rounded-md font-medium mx-0.5 md:mx-1 mb-2 ${currentPage === page
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                    } transition-all duration-200`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageGroupChange(1)}
              disabled={endPage === totalPages}
              className="px-2 md:px-4 cursor-pointer py-1 md:py-2 text-sm md:text-base rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ml-1 md:ml-4 mb-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;