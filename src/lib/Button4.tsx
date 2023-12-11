import React from "react";

interface IButton {
  title: string;
  onClick: () => void;
}

const Button4 = ({title, onClick}: IButton) => {
  return (
      <button
          draggable
          onClick={onClick}
          onDragEnd={onClick}
          className="group btn relative rounded p-1 font-medium text-gray-800
          hover:text-gray-700 hover:border-amber-500
          bg-gradient-to-b from-gray-200 to-gray-300 normal-case border-amber-600
          xxs:w-full"
      >
      <span className="relative px-5 xxs:text-sm xs:text-sm md:text-lg text-amber-700 whitespace-nowrap">
        {title}
      </span>
      </button>
  );
};

export default Button4;
