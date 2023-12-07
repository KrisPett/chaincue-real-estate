import React from 'react';

interface LoadingSpinnerProps {
  size?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
      <div className={"justify-center flex"}>
        <span
            className={`loading loading-infinity ${props.size ? props.size : "w-20"} bg-gradient-to-r from-amber-700 via-amber-500 to-amber-500`}>
        </span>
      </div>
  );
};

export default LoadingSpinner
