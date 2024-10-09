import React, { useEffect, useState, ReactNode } from 'react';
import { X } from 'lucide-react';
import '../styles/Modal.css';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
   const [show, setShow] = useState(isOpen);

   useEffect(() => {
      if (isOpen) {
         setShow(true);
      } else {
         const timer = setTimeout(() => setShow(false), 300);
         return () => clearTimeout(timer);
      }
   }, [isOpen]);

   if (!show) return null;

   return (
      <div
         className={`fixed inset-0 px-2 flex items-center justify-center bg-neutral-900 bg-opacity-50 backdrop-blur-md z-50 ${isOpen ? 'modal-enter' : 'modal-exit'}`}
      >
         <div className="bg-neutral-800/50 p-6 rounded-xl shadow-lg w-custom relative transition-all duration-100 max-h-custom overflow-y-scroll border border-neutral-600">
            <button
               onClick={onClose}
               className="absolute top-5 right-5 text-white p-1 hover:bg-neutral-700 rounded"
            >
               <X />
            </button>
            {title && (
               <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
            )}
            <div>{children}</div>
         </div>
      </div>
   );
};

export default Modal;