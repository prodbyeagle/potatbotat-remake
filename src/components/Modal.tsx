import React from 'react';
import '../styles/Modal.css';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="modal-bg">
            <div className="modal-content animate">
               {children}
               <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="mt-6 w-fit bg-red-600 text-white py-2 px-4 rounded-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
               >
                  Close Modal
               </button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
