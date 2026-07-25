import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { User,AtSign,LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const desktopTriggerRef = useRef(null);
  const mobileTriggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const { user,session,signOut } = useAuth();
  
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
    { name: 'HOME', to: '/' },
    { name: 'DESTINATIONS', to: 'destinations' },
  ];

  {user? 
    navLinks.push(
      { name: 'DASHBOARD', to: 'dashboard' },
    )
    :
    navLinks.push(
      { name: 'SIGNIN', to: 'signin' },
      { name: 'LOGIN', to: 'login' },
    )
  };
  
  function handleProfileDropdown() {
    if(!isProfileOpen){
      setIsProfileOpen(true);
    }else {
      setIsProfileOpen(false);
    }
  }
  
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedElement = event.target;

      // Check if the click happened outside the dropdown AND outside both buttons
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(clickedElement);
      const clickedOutsideDesktopBtn = desktopTriggerRef.current && !desktopTriggerRef.current.contains(clickedElement);
      const clickedOutsideMobileBtn = mobileTriggerRef.current && !mobileTriggerRef.current.contains(clickedElement);

      if (clickedOutsideDropdown && clickedOutsideDesktopBtn && clickedOutsideMobileBtn) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLinkClass = ({ isActive }) =>
    `relative py-2 tracking-[0.2em] transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-white/60 hover:text-white'
    }`;
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent tracking-widest text-sm font-light text-white transition-transform duration-500 ease-in-out ${
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
          <span className="md:flex gap-12 font-space-grotesk items-center">
          <div className='hidden md:flex space-x-12'>
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
          <img 
          src={session?.user.user_metadata.avatar_url} 
          ref={desktopTriggerRef}
          onClick={handleProfileDropdown}
          className={`${user? 'hidden md:block h-6 w-6 rounded-full' : 'hidden'}`}>
          </img>
          {isProfileOpen && (
          <div ref={dropdownRef} className={`${user? '' : 'hidden' } ${isProfileOpen? 'absolute' : 'hidden'} flex flex-col py-1 w-auto bg-zinc-800 top-16 right-14 sm:right-20 md:right-8 lg:right-24`}>
            <span className='flex gap-2 items-center px-3 py-2'>
              <User size={16} color="#ffffff" strokeWidth={1.25} />
              <p className='text-[0.7rem] '>{session?.user?.user_metadata?.name}</p>
            </span>
            <span className='flex gap-2 items-center px-3 py-2 mb-2'>
              <AtSign size={16} color="#ffffff" strokeWidth={1.25} />
              <p className='text-[0.75rem] '>{session?.user?.user_metadata?.email}</p>
            </span>
            <span className='px-1 pt-1 border-t border-white/35'>
              <button onClick={signOut} className='flex gap-2 items-cente w-full px-2 py-2 hover:bg-zinc-900 '>
                <LogOut size={16} strokeWidth={1.25} />
                <p className='text-[0.7rem] '>Logout</p>
              </button>
            </span>
          </div>
          )}
          </span>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <img 
            src={session?.user.user_metadata.avatar_url} 
            ref={mobileTriggerRef}
            onClick={handleProfileDropdown}
            className={`${user? 'h-6 w-6 rounded-full' : 'hidden'}`}>
            </img>
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
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
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

