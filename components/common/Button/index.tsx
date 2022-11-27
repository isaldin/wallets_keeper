import React from 'react';

type ButtonProps = {
  children: string;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`font-semibold py-2 px-4 rounded ${
        props.disabled
          ? 'bg-transparent text-blue-700 border border-blue-500'
          : 'text-white bg-blue-500 border-transparent'
      }`}
      {...props}
      type="button"
    >
      {props.children}
    </button>
  );
};

export default Button;
