import React from "react";

interface IButton {
  title: string;
  onClick: () => void;
}

const Button = ({title, onClick}: IButton) => {
  return (
      <button
          draggable
          onClick={onClick}
          onDragEnd={onClick}
          className="group btn relative rounded-md p-1 text-sm font-medium text-gray-800
          hover:text-gray-700 hover:border-amber-500
          bg-gradient-to-b from-gray-200 to-gray-300 xxs:w-full normal-case border-amber-600
          "
      >
      <span className="relative px-5 text-lg text-amber-700 whitespace-nowrap">
        {title}
      </span>
      </button>
  );
};

export default Button;
