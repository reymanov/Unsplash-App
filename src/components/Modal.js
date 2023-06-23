import React from "react";

const Modal = ({ handleCloseModal, photoModal }) => {
  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_textbox">
          <button className="modal_button" onClick={handleCloseModal}>
            X
          </button>
          <h1 className="modal_author">{photoModal.author}</h1>
          <h2 className="modal_location">{photoModal.location}</h2>
        </div>
        <img src={photoModal.url} alt="modalphoto" className="modal_photo" />
      </div>
    </div>
  );
};

export default Modal;
