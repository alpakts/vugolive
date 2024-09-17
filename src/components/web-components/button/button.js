import React from 'react';

const CustomButton = (props) => {
  return (
    <div className={`bg-secondary text-sm uppercase rounded px-2 py-3 text-center text-black font-bold hover:bg-primary hover:bg-opacity-90 hover:text-secondary ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default CustomButton;