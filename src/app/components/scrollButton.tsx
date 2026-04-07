import React from 'react';
import { scrollToDataNav } from '@/utils/scrollUtils';

interface ScrollButtonProps {
  navId: string;
  offset?: number;
  children: React.ReactNode;
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ 
  navId, 
  offset = 0, 
  children,
  className 
}) => {
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    scrollToDataNav(navId, offset);
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
      aria-label={`Scroll to section ${navId}`}
    >
      {children}
    </button>
  );
};

export default ScrollButton;
