import React from 'react';
import { createPortal } from "react-dom";
import FocusTrap from "focus-trap-react";
import './Dialog.css';

const Dialog = ({title, children, onClose}) => {
    return createPortal(
        <div className="dialog-overlay">
            <FocusTrap focusTrapOptions={{clickOutsideDeactivates: onClose}}>
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