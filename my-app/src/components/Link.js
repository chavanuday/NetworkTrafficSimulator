import React from 'react';

const Link = ({ traffic, orientation = 'horizontal' }) => {
  const linkClass = orientation === 'horizontal' ? 'h-1 w-2/3' : 'w-1 h-2/3';
  
  return (
    <div className={`absolute bg-gray-400 ${linkClass}`}>
      <div className="absolute text-gray-700">
        Traffic: {traffic} p/s
      </div>
    </div>
  );
};

export default Link;
