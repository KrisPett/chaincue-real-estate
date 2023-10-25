import React from 'react';

const Divider = () => {
  return (
      <div className="flex items-center justify-center w-full border-amber-500">
        <div className="w-2 h-2 border-t-2 border-l-2 transform -rotate-45 border-amber-500 mx-1"></div>
        <div className="border-2 w-full border-amber-500"></div>
        <div className="w-2 h-2 border-t-2 border-r-2 transform rotate-45 border-amber-500 mx-1"></div>
      </div>
  );
};

export default Divider;
