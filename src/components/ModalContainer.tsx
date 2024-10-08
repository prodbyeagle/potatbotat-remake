import React, { useState } from 'react';
import Modal from './Modal';

const ModalContainer: React.FC<{ children: (addModal: (modal: React.ReactNode) => void, removeModal: () => void) => React.ReactNode }> = ({ children }) => {
   const [modalStack, setModalStack] = useState<React.ReactNode[]>([]);

   const addModal = (modal: React.ReactNode) => {
      setModalStack((prev) => [...prev, modal]);
   };

   const removeModal = () => {
      setModalStack((prev) => prev.slice(0, prev.length - 1));
   };

   return (
      <>
         {children(addModal, removeModal)}
         {modalStack.map((modal, index) => (
            <Modal key={index} isOpen={true} onClose={removeModal}>
               {modal}
            </Modal>
         ))}
      </>
   );
};

export default ModalContainer;
