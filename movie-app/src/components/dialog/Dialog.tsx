import React, { FC, ReactNode } from 'react';
import { createPortal } from "react-dom";
import FocusTrap from "focus-trap-react";
import './Dialog.css';

interface IDialog {
    title: string;
    children: ReactNode;
    onClose: () => void;
}

const Dialog: FC<IDialog> = ({title, children, onClose}) => {
    return createPortal(
        <div className="dialog-overlay">
            <FocusTrap focusTrapOptions={{clickOutsideDeactivates: true}}>
                <div className="dialog-box" role="dialog">
                    <header className="dialog-header">
                        <h2>{title}</h2>
                        <button data-testid="close-button" className="dialog-close-button" onClick={onClose}>
                            &times; {}
                        </button>
                    </header>
                    <div>
                        {children}
                    </div>
                </div>
            </FocusTrap>
        </div>,
        document.body
    );
};

export default Dialog;