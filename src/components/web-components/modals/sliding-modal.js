"use client";
import { useState, useEffect } from "react";
import CustomButton from "../button/button";

const SlidingModal = ({ OpenButton,modalTitle ,children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalY, setModalY] = useState(300); 
  const [startY, setStartY] = useState(0); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        setModalY(0);
      }, 100); 
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalY(1000);
    setTimeout(() => {
      setIsOpen(false); 
    }, 700); 
  };

  const 
  handleDragStart = (e) => {
    setStartY(e.clientY || e.touches[0].clientY);
  };

  const handleDragMove = (e) => {
    const currentY = e.clientY || e.touches[0].clientY;
    const diffY = currentY - startY;

    if (diffY > 0) {
      setModalY(diffY);
    }
  };

  const handleDragEnd = () => {
    if (modalY > 200) {
      closeModal();
    } else {
      setModalY(0); 
    }
  };

  return (
    <>
      <div onClick={openModal}>{OpenButton}</div>

      {isOpen && (
        <div className="fixed inset-0 !m-0 bg-black bg-opacity-50 h-screen flex z-[999] justify-center items-end transition-opacity duration-700">
          <div
            className="bg-black w-full md:w-4/5  rounded-t-lg transform h-full transition-transform duration-700 ease-out relative"
            style={{ transform: `translateY(${modalY}px)` }}
          >
            {/* Drag Handle */}
            <div
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              className="border-t-4 border-gray-900 rounded-full w-full h-8 cursor-pointer flex justify-center items-center"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div className="bg-secondary w-32 h-2 rounded"></div>
            </div>

            <div className="p-6 flex flex-col justify-between h-full">
              <div>
               { modalTitle&& {modalTitle}}
                {children}
              </div>

              {/* Close Button */}
              <CustomButton
                className="bg-gray-900 absolute bottom-0 w-full left-0 text-secondary  font-bold  py-2  mt-4"
                onClick={closeModal}
              >
                Kapat
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SlidingModal;