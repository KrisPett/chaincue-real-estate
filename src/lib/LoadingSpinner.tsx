import React from 'react';

const LoadingSpinner = () => {
  return (
      <div className={"justify-center flex"}>
        <span
            className="loading loading-infinity w-20 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-500">
        </span>
      </div>
  );
};

export default LoadingSpinner;
