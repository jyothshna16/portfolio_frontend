import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import ResumeExperience from './components/ResumeExperience'; 
import Contact from './components/Contact';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h1>🚧 Oops! Something went wrong</h1>
          <p>We're working to fix this issue. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '25px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 404 Not Found Component
const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <a 
      href="/" 
      style={{
        padding: '12px 24px',
        marginTop: '20px',
        background: 'rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '25px',
        color: 'white',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
      onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
    >
      🏠 Go Home
    </a>
  </div>
);

function App() {
  // Safe theme initialization - prevents server-side rendering issues
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('theme') || 'light';
      } catch (error) {
        console.warn('localStorage not available:', error);
        return 'light';
      }
    }
    return 'light';
  });

  // Safe theme persistence
  useEffect(() => {
    try {
      document.body.setAttribute('data-bs-theme', theme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.warn('Theme persistence failed:', error);
    }
  }, [theme]);

  // AOS initialization with error handling
  useEffect(() => {
    try {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100, // Start animation 100px before element is in view
        easing: 'ease-out-cubic'
      });
    } catch (error) {
      console.warn('AOS initialization failed:', error);
    }
  }, []);

  // Safe theme toggle
  const toggleTheme = () => {
    try {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    } catch (error) {
      console.error('Theme toggle failed:', error);
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header toggleTheme={toggleTheme} currentTheme={theme} /> 
          <main className="flex-grow-1 main-content">
            <Routes>
              {/* FIXED: Specific route for home page instead of wildcard */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<ResumeExperience />} />
              <Route path="/contact" element={<Contact />} />
              {/* Proper 404 fallback - now at the end */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;