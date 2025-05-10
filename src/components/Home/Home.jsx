import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Alex',
    role: 'Professional Gamer',
    experience: 'GameScope has revolutionized how I discover and enjoy free-to-play games. The curated selection is incredible!Perfect for casual players and hardcore gamers alike.',
    rating: 5
  },
  {
    id: 2,
    name: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Emma',
    role: 'Casual Gamer',
    experience: 'As a busy professional, GameScope helps me find quick, fun games without breaking the bank. Love the intuitive interface!',
    rating: 4
  },
  {
    id: 3,
    name: 'Raj Patel',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Raj',
    role: 'eSports Enthusiast',
    experience: 'The game recommendations are spot on! I\'ve discovered so many hidden gems that I would have missed otherwise.',
    rating: 5
  }
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Hero section animation variants
  const heroVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const heroItemVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={heroVariants}
        className="relative overflow-hidden h-screen"
      >
        <div className="absolute inset-0 h-screen w-screen">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut" 
            }}
            src="../src/assets/hero-poster.jpg"
            alt="Featured Game"
            className="w-full h-full object-cover filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center flex flex-col items-center justify-center h-147">
            <motion.h1 
              variants={heroItemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Welcome to <b className="text-blue-500">G</b>ame<b className="text-blue-500">S</b>cope
            </motion.h1>
            <motion.p 
              variants={heroItemVariants}
              className="text-xl md:text-2xl text-gray-200 mb-8 w-1/2"
            >
              Your one-stop hub for the finest free-to-play titles.
              Find, explore, and jump into action instantly.
            </motion.p>
            <motion.div 
              variants={heroItemVariants}
            >
              <Link
                to="/games"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 group"
              >
                Browse All Games
                <motion.svg 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.8,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300
                  }}
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-12 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2"><b>Free Games</b></h3>
              <p className="text-gray-500">Discover thousands of free-to-play games across all genres</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2"><b>Multi-Platform</b></h3>
              <p className="text-gray-500">Games available on PC, Mobile, and Console</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2"><b>Community</b></h3>
              <p className="text-gray-500">Join a vibrant community of gamers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Carousel Section */}
      <section className="relative bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://media.istockphoto.com/id/1394297245/photo/top-view-of-man-pro-gamer-playing-online-video-game-at-home.jpg?s=2048x2048&w=is&k=20&c=Qn4I4GZAxMb82xW7TOGiEDtV7S_wcZdrWWCJEuVTQmk=" 
            alt="PC Gaming Background" 
            className="w-full h-full object-cover opacity-30 filter brightness-60"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative mb-8">
              <FaQuoteLeft className="absolute -top-4 -left-8 text-4xl text-blue-500 opacity-20" />
              <p className="text-lg md:text-xl text-white italic mb-6 relative z-10">
                {testimonials[currentTestimonial].experience}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <motion.img 
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-blue-400">
                  {testimonials[currentTestimonial].role}
                </p>
                <div className="flex text-yellow-500 mt-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Responsive Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center">
            <button 
              onClick={prevTestimonial}
              className="bg-gray-700/50 text-white rounded-full p-2 hover:bg-gray-600/50 transition-colors ml-4 sm:ml-0"
            >
              <FaChevronLeft className="text-white" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="bg-gray-700/50 text-white rounded-full p-2 hover:bg-gray-600/50 transition-colors mr-4 sm:mr-0"
            >
              <FaChevronRight className="text-white" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;