import React, { useState, useEffect } from 'react';
import './Header.css'; // Move styles to separate CSS file

const Header = ({ toggleTheme, currentTheme = 'light' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe theme toggle handler
  const handleThemeToggle = () => {
    if (toggleTheme && typeof toggleTheme === 'function') {
      toggleTheme();
    }
  };

  // Close mobile menu when clicking nav links
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Dynamic header styles - moved outside JSX for better performance
  const headerStyles = {
    background: currentTheme === 'light' 
      ? isScrolled 
        ? 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)'
        : '#0A192F'
      : isScrolled
        ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)'
        : '#212529',
    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
    boxShadow: isScrolled 
      ? '0 10px 40px rgba(0,0,0,0.3)' 
      : '0 4px 6px rgba(0,0,0,0.1)',
    borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid #444'
  };

  return (
    <header 
      className={`premium-header animate-fade-in ${isScrolled ? 'scrolled' : ''}`}
      style={headerStyles}
    >
      <div className="premium-container">
        <a href="/" className="premium-brand">
          ✨ My Portfolio
        </a>
        
        <nav className="premium-nav">
          <a href="/" className="premium-nav-link" onClick={handleNavClick}>
            🏠 Home
          </a>
          <a href="/about" className="premium-nav-link" onClick={handleNavClick}>
            👤 About
          </a>
          <a href="/projects" className="premium-nav-link" onClick={handleNavClick}>
            💼 Projects
          </a>
          <a href="/resume" className="premium-nav-link" onClick={handleNavClick}>
            📄 Resume
          </a>
          <a href="/contact" className="premium-nav-link" onClick={handleNavClick}>
            📧 Contact
          </a>
          
          <button
            className="premium-button"
            onClick={handleThemeToggle}
            title={currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
        
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav">
            <a href="/" className="premium-nav-link" onClick={handleNavClick}>
              🏠 Home
            </a>
            <a href="/about" className="premium-nav-link" onClick={handleNavClick}>
              👤 About
            </a>
            <a href="/projects" className="premium-nav-link" onClick={handleNavClick}>
              💼 Projects
            </a>
            <a href="/resume" className="premium-nav-link" onClick={handleNavClick}>
              📄 Resume
            </a>
            <a href="/contact" className="premium-nav-link" onClick={handleNavClick}>
              📧 Contact
            </a>
            
            <button
              className="premium-button mobile-theme-btn"
              onClick={handleThemeToggle}
            >
              {currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;