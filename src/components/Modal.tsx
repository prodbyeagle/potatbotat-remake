// Modal.tsx

import React from 'react';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm rounded-xl">
         <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-600 rounded-xl p-6 shadow-2xl">
            <button onClick={onClose} className="text-white text-lg mb-4">
               Close
            </button>
            {children}
         </div>
      </div>
   );
};

export default Modal;
