import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-neutral-900/50 backdrop-blur-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white text-2xl tracking-wider font-light"
          >
            <FiTerminal className="w-6 h-6" />
            <span>Admin Panel</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white text-sm"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar; 