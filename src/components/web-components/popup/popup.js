'use client';

import React, { useEffect, useImperativeHandle, forwardRef, useState } from 'react';

const PopupComp = forwardRef(({ openButtonContent }, ref) => {
  const [popupContent, setPopupContent] = useState({ icon: null, children: null });
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    triggerPopup(newIcon, newChildren) {
      setPopupContent({ icon: newIcon, children: newChildren });
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000); 
    },
  }));

  return (
    <>
      {openButtonContent}
      <div
        id="toast-simple"
        className={`flex fixed top-5 left-1/2 transform -translate-x-1/2 z-[999999] items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow transition-all duration-500 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        role="alert"
      >
        {popupContent.icon}
        <div className="ps-4 text-base font-normal">{popupContent.children}</div>
      </div>
    </>
  );
});

export default PopupComp;
