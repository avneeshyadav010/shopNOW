import { useState } from "react";


const Modal = (props) => {
    
    return (
        <>
            
            <div className="modal">
                <div onClick={props.onClose} className="overlay">
                    <div className="modal-content">
                        <img src={props.srcProps} alt="Image"></img>
                        <button className="close-modal" onClick={props.onClose}>
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;