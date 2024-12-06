import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShield } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact', href: '#contact' },
  ];

  // Admin Switch Component
  const AdminSwitch = () => {
    const toggleAdmin = () => {
      setIsAdmin(!isAdmin);
      if (!isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex items-center"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleAdmin}
          className="group flex items-center space-x-2 px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-700 transition-colors duration-300"
        >
          <FiShield className={`w-4 h-4 ${isAdmin ? 'text-white' : 'text-neutral-500'}`} />
          <span className={`text-sm ${isAdmin ? 'text-white' : 'text-neutral-500'}`}>Admin</span>
          <div className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${
            isAdmin ? 'bg-white' : 'bg-neutral-800'
          }`}>
            <motion.div
              initial={false}
              animate={{
                x: isAdmin ? 16 : 0,
                backgroundColor: isAdmin ? '#000' : '#666'
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full"
            />
          </div>
        </motion.button>

        {/* Admin Indicator */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <Link
                to="/admin"
                className="text-xs text-neutral-500 hover:text-white transition-colors duration-300"
              >
                Admin Mode Active
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4 bg-black/50 backdrop-blur-md' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white text-2xl tracking-wider font-light"
            >
              YourName
              <span className="text-neutral-500">.</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm tracking-wide"
                >
                  {item.name}
                </motion.a>
              ))}
              <AdminSwitch />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <AdminSwitch />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FiMenu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-neutral-900/50 backdrop-blur-md z-50 border-l border-neutral-800"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                  <span className="text-white text-lg tracking-wide font-light">Menu</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-8">
                  <div className="flex flex-col space-y-4 px-6">
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        whileHover={{ x: 4 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-neutral-400 hover:text-white transition-colors duration-300 text-lg tracking-wide py-2"
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-6 border-t border-neutral-800">
                  <div className="text-neutral-500 text-sm tracking-wide">
                    Get in touch
                    <a 
                      href="mailto:your.email@example.com" 
                      className="block text-white hover:text-neutral-300 transition-colors duration-300 mt-2"
                    >
                      your.email@example.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 