import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // If scrolling down and past the threshold, hide it
      else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsOpen(false); // Auto-close mobile drawer on scroll down
      } 
      // If scrolling up, reveal it
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Destinations', to: '/destinations' },
    { name: 'Book a Trip', to: '/book' },
  ];

  const getLinkClass = ({ isActive }) =>
    `relative py-2 tracking-[0.2em] transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-white/60 hover:text-white'
    }`;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent uppercase tracking-widest text-sm font-light text-white transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-screen mx-auto px-6 sm:px-12 lg:px-28">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="font-bold tracking-[0.3em] text-lg hover:text-gray-300 transition-colors font-syne">
              COSMOS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12 font-space-grotesk">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to} className={getLinkClass}>
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span 
                      className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-white/80 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-black/95 border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-65 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-3 px-6 py-4 font-space-grotesk">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `block py-3 text-white/80 hover:text-white transition-colors duration-300 ${
                  isActive ? 'text-white font-medium' : ''
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

