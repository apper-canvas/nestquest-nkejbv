import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');

  useEffect(() => {
    // Update document class and localStorage when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen">
      {/* Dark Mode Toggle */}
      <button 
        aria-label="Toggle dark mode"
        onClick={toggleDarkMode}
        className="fixed z-50 bottom-5 right-5 p-3 rounded-full bg-surface-200 dark:bg-surface-700 shadow-neu-light dark:shadow-neu-dark hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-300"
      >
        {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </button>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur bg-surface-50/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
              N
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NestQuest
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">Home</a>
            <a href="#featured" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">Featured</a>
            <a href="#search" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition">Search</a>
          </nav>
          
          <div className="flex items-center">
            <button className="hidden md:flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all shadow-soft">
              <span>List Property</span>
            </button>
          </div>
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="backdrop-blur bg-surface-50/90 dark:bg-surface-800/90 shadow-card"
      />
    </div>
  );
}

export default App;