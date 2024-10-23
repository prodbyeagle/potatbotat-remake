import React, { useRef, useEffect, ReactNode } from 'react';

interface ContextMenuProps {
   x: number;
   y: number;
   onClose: () => void;
   children: ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, children }) => {
   const menuRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [onClose]);

   useEffect(() => {
      if (menuRef.current) {
         const menu = menuRef.current;

         const { innerWidth, innerHeight } = window;
         const rect = menu.getBoundingClientRect();

         let newX = x;
         let newY = y;
         if (rect.right > innerWidth) {
            newX = innerWidth - rect.width - 10;
         }

         if (rect.bottom > innerHeight) {
            newY = innerHeight - rect.height - 10;
         }

         menu.style.left = `${newX}px`;
         menu.style.top = `${newY}px`;
      }
   }, [x, y]);

   return (
      <div
         ref={menuRef}
         style={{ top: y, left: x, position: 'fixed' }}
         className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-600 rounded-xl p-2 text-white z-50"
      >
         <ul className="space-y-2">
            {children}
         </ul>
      </div>
   );
};

export default ContextMenu;
