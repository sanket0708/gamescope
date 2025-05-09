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
  const pagesToShow = 10;
  const gamesContainerRef = useRef(null);

  const fetchGames = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
        params: { page, title: search },
        headers: {
          'x-rapidapi-key': 'cddd97d10bmshb173db3d405a0ffp178473jsn0a4c87c0eda9',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      });

      // Filter games if search term exists
      const filteredGames = search
        ? response.data.filter(game =>
          game.title.toLowerCase().includes(search.toLowerCase())
        )
        : response.data;

      setGames(filteredGames);
      setTotalPages(Math.ceil(filteredGames.length / itemsPerPage));

      // Set error message if no games found during search
      if (search && filteredGames.length === 0) {
        setError(`No games found for "${search}". Please try another search.`);
      } else {
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setCurrentPageGroup(1);
    fetchGames(1, term);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setCurrentPageGroup(1);
    fetchGames();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchGames(pageNumber, searchTerm);
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
    fetchGames(newPage, searchTerm);
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
      <div className="text-center py-16">
        <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchGames();
          }}
          className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Try Again
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
        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {searchTerm && (
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