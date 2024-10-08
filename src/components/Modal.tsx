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
         <div className="modal-bg" onClick={onClose}>
            <div className="modal-content animate" onClick={(e) => e.stopPropagation()}>
               {children}
            </div>
         </div>
      </div>
   );
};

export default Modal;
