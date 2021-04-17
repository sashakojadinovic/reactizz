import React from 'react';
import {ExclamationTriangle} from 'react-bootstrap-icons';
function Modal(props) {
    return (
    <div className="modal-container animate-bgrnd">
        <div className="modal animate-modal">
            <ExclamationTriangle className="modal-icon"/>
            <p>{props.message}</p>
            <button onClick={()=>props.closeModal(true)} className="btn red modal-btn">Da</button><button onClick={()=>props.closeModal(false)} className="btn green modal-btn">Ne</button>
        </div>
    </div>        
    )
}

export default Modal
