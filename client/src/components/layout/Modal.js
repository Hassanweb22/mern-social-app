import React, { Fragment, useEffect, useState } from "react"
import { useDelayUnmount } from "../../utils"
import "./Modal.css"

const Modal = ({ open, setOpen, onConfirm, onClose, title, content }) => {

    const shouldRenderChild = useDelayUnmount(open, 850)

    return (
        <Fragment>
            {shouldRenderChild &&
                <div className="modal">
                    <div className={`animate__animated ${open ? "animate__zoomInDown" : "animate__zoomOutDown"} modal-content`}>
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body ">
                            {content}
                        </div>
                        <div className="buttons modal-footer">
                            <a className="btn btn-primary" onClick={onConfirm}>Yes</a>
                            <a className="btn btn-light" onClick={onClose}>No</a>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}
export default Modal