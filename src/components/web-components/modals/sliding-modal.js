"use client";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import CustomButton from "../button/button";
import { IoMdClose } from "react-icons/io";

const SlidingModal =  forwardRef(({ OpenButton,modalTitle ,children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalY, setModalY] = useState(300); 
  const [startY, setStartY] = useState(0); 
  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
    },
    closeModal() {
      closeModal();
    },
  }));
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
    if (modalY > 100) {
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
              <CustomButton
                className="bg-transparent absolute  w-fit right-0 text-secondary  font-bold  py-2  mt-4"
                onClick={closeModal}
              >
                <IoMdClose size={24} />
              </CustomButton>
            </div>

            <div className="px-4 flex flex-col justify-between h-full overflow-auto">
              <div>
               { modalTitle&& {modalTitle}}
                {children}
              </div>

              {/* Close Button */}
           
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default SlidingModal;
