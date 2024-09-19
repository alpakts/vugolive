import React from "react";

const MenuItem = ({ icon, text,onClick }) => {
  return (
    <div onClick={onClick} className="flex cursor-pointer items-center px-4 py-3 bg-gray-900 rounded-lg bg-opacity-90 text-base hover:bg-primary ">
      <div className="text-lg">{icon}</div>
      <span className="ml-4 text-lg font-medium">{text}</span>
    </div>
  );
};

export default MenuItem;
