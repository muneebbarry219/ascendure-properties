import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const location = useLocation();
  const forceDarkLogo = location.pathname.startsWith('/property/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (isLanguageOpen && !event.target.closest('.language-selector')) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Neighbourhoods', href: '/neighbourhoods' },
    { name: 'About us', href: '/about' },
    { name: 'Insights', href: '/insights' }
  ];

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl shadow-2xl border-b border-yellow-200/30' 
          : ''
      }`}
      style={{ backgroundColor: isScrolled ? '#D9D9D9' : 'transparent' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <div className="flex flex-col">
              <h1 className={`text-2xl font-display font-bold ${forceDarkLogo ? 'text-gray-900' : (isScrolled ? 'text-gray-900' : 'text-white')}`}>
                ASCENDURE
              </h1>
              <p className={`text-sm font-medium -mt-1 ${forceDarkLogo ? 'text-gray-700' : (isScrolled ? 'text-gray-700' : 'text-white/90')}`}>PROPERTIES</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-lg px-6 py-3 z-20">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'text-yellow-400'
                    : isScrolled 
                      ? 'text-white hover:text-yellow-400' 
                      : 'text-white hover:text-yellow-400'
                }`}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Right Side - Contact Button and Language */}
          <div className="flex items-center space-x-4 z-10">
            {/* Contact Button */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex text-white font-bold px-6 py-2 rounded-lg text-sm transition-all duration-300"
              style={{ backgroundColor: '#0A2540' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0B2A4A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0A2540'}
            >
              CONTACT US
            </Link>

            {/* Language Selector */}
            <div className="relative language-selector">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage}</span>
              </button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border z-[9999]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/20 bg-black/80 backdrop-blur-md relative z-[9999]"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                        location.pathname === item.href
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-white hover:text-yellow-400 hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Removed mobile CTA button per request */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
