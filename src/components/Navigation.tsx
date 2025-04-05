
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Circuit, ArrowDownToLine, Atom } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="fixed top-0 right-0 z-30 m-4">
      <div className="flex space-x-4 bg-black/70 p-3 rounded-lg backdrop-blur-md border border-purple-900/50">
        <Link 
          to="/" 
          className={`text-white px-3 py-1 rounded flex items-center gap-2 ${location.pathname === '/' ? 'bg-purple-800' : 'hover:bg-purple-900/60'}`}
        >
          <Atom className="w-5 h-5" />
          <span>Unified System</span>
        </Link>
        <Link 
          to="/energy-generator" 
          className={`text-white px-3 py-1 rounded flex items-center gap-2 ${location.pathname === '/energy-generator' ? 'bg-purple-800' : 'hover:bg-purple-900/60'}`}
        >
          <Circuit className="w-5 h-5" />
          <span>Energy Output</span>
        </Link>
        <button 
          className="text-white px-3 py-1 rounded flex items-center gap-2 bg-green-700 hover:bg-green-800"
          onClick={() => {
            // Simulate "downloading" power
            const powerOutput = Math.floor(Math.random() * 100);
            alert(`Successfully harvested ${powerOutput}kW of nonlinear energy into quantum battery storage!`);
          }}
        >
          <ArrowDownToLine className="w-5 h-5" />
          <span>Harvest Energy</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
