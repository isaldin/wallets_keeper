import React from 'react';
import { createPortal } from 'react-dom';

const modalRootContainer =
  typeof window === 'undefined' ? null : document.getElementById('modal-root')!;

type ModalProps = {
  isShown: boolean;
  title: string;
  renderContent: () => React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isShown || !modalRootContainer) {
    return null;
  }

  return createPortal(
    <div
      onClick={props.onClose}
      className="absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-slate-600 w-1/2 rounded-md drop-shadow-lg max-w-2xl"
      >
        <div className="h-10 flex justify-center items-center">{props.title}</div>
        <div className="p-4">{props.renderContent()}</div>
      </div>
    </div>,
    modalRootContainer,
  );
};

export default Modal;
