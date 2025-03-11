import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  secondaryButton?: {
    text: string;
    link: string;
  };
  rightButton?: {
    text: string;
    link?: string;
    onClick?: () => void;
  };
}

const Header: React.FC<HeaderProps> = ({ secondaryButton, rightButton }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <h1 className="text-2xl font-bold text-white">NYXAlign AI</h1>
      <div className="flex space-x-4">
        {secondaryButton && (
          <Link
            to={secondaryButton.link}
            className="px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-black transition-colors"
          >
            {secondaryButton.text}
          </Link>
        )}
        {rightButton && (
          rightButton.onClick ? (
            <button
              onClick={rightButton.onClick}
              className="px-4 py-2 bg-[#0A81D1] rounded-md hover:bg-[#00D4FF] transition-colors flex items-center"
            >
              {rightButton.text}
            </button>
          ) : (
            <Link
              to={rightButton.link || '#'}
              className="px-4 py-2 bg-[#0A81D1] rounded-md hover:bg-[#00D4FF] transition-colors"
            >
              {rightButton.text}
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
