export interface Paint {
   url?: string;
   gradient?: string;
   shadow?: string;
   name: string;
}

export interface PaintSelectorProps {
   isOpen: boolean;
   onClose: () => void;
   onSelect: (paint: Paint) => void;
}