'use client';

import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="sticky top-0 bg-neutral-900 bg-opacity-80 backdrop-blur-lg z-40 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <h1 className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
          STSV.2025
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={onLoginClick}
            className="flex items-center px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full font-semibold hover:bg-neutral-700 hover:text-white transition-colors shadow-md"
          >
            <LogIn className="mr-2" />
            Đăng nhập
          </button>
          <button
            onClick={onRegisterClick}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            <UserPlus className="mr-2" />
            Đăng ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
