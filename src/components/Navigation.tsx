
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="fixed top-0 right-0 z-30 m-4">
      <div className="flex space-x-4 bg-black/50 p-2 rounded-lg">
        <Link 
          to="/" 
          className={`text-white px-3 py-1 rounded ${location.pathname === '/' ? 'bg-purple-700' : 'hover:bg-purple-900'}`}
        >
          Unified Power System
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
