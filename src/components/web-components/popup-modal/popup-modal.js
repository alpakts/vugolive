import { forwardRef, useImperativeHandle, useState } from 'react';
import { FiX } from 'react-icons/fi';

const PopupModalComp = forwardRef(({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }));
  
    return (
      isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-gray-800 text-white rounded-lg max-w-md w-full">
            <button
              className="absolute top-3 right-3 text-white z-20"
              onClick={() => {
                console.log('close',isOpen)
                ref.current.closeModal();
              }}
            >
              <FiX size={24} />
            </button>
            {children}
          </div>
        </div>
      )
    );
});
  
export default PopupModalComp;
