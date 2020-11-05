import React from 'react';

class Modal extends React.Component {
  
    render() {
        return (
            <div className="modal_background">
                <div className="modal_container">
                    <div className="modal_textbox">
                        <button className="modal_button" onClick={this.props.handleCloseModal}>X</button>
                        <h1 className="modal_author">{this.props.photoModal.author}</h1>
                        <h2 className="modal_location">{this.props.photoModal.location}</h2>
                    </div>
                    <img src={this.props.photoModal.url} alt="modalphoto" className="modal_photo" />
                </div>
            </div>
        )
    }
}

export default Modal