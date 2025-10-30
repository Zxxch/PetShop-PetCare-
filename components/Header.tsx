// FIX: The original file was an invalid JSX snippet. It has been converted into a complete and functional React component.
// This includes adding necessary imports, state management for the dropdown and scroll behavior, and a default export.
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PawPrintIcon, UserCircleIcon, LogOutIcon } from './Icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hides header on scroll down, shows on scroll up
  const controlHeader = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [controlHeader]);


  if (!user) {
    return null;
  }

  return (
    <header className={`bg-brand-DEFAULT text-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <PawPrintIcon className="h-8 w-8 text-black" />
          <span className="text-2xl font-bold text-black">PetCare+</span>
        </Link>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-full bg-brand-dark pl-1 pr-3 py-1 transition-all hover:brightness-110"
          >
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt="Perfil" className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <UserCircleIcon className="h-8 w-8" />
            )}
            <span className="font-medium">{user?.name}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-gray-700" onMouseLeave={() => setDropdownOpen(false)}>
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Perfil</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
