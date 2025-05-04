import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  useEffect(() => {
    // Auto redirect after 10 seconds
    const redirectTimeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, 10000);
    
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center p-5 text-center"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="mb-8 w-24 h-24 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto neu-shadow"
        >
          <AlertTriangleIcon className="w-12 h-12 text-secondary" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-surface-600 dark:text-surface-400 mb-8"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="btn-primary px-6 py-3 inline-flex items-center space-x-2 text-lg"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <p className="text-surface-500 dark:text-surface-400 mt-6 text-sm">
            Redirecting to home page in a few seconds...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;