import React from 'react';
import SearchBar from './SearchBar';
import './style.css';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'

class Photos extends React.Component {

    state = {
        clientID: 'CGJ2fNev_5sMed70cHIs7u9fKQZKeumnJkKpVPtxAKI',
        photos: {
            results: []
        },
        photoName: '',
        showModal: false,
        photoModal: {
            url: '',
            author: '',
            location: '',
        }
    }

    componentDidMount() {

        fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${localStorage.getItem('photoName')}&client_id=${this.state.clientID}`)
            .then(res => res.json())
            .then(data =>
                this.setState({
                    photos: data,
                }))
    }

    handleChange = (event) => {
        this.setState({
            photoName: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.photoName.length >= 3) {

            fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${this.state.photoName}&client_id=${this.state.clientID}`)
                .then(res => res.json())
                .then(data =>
                    this.setState({
                        photos: data,
                        photoName: '',
                        redirectToPhotos: true
                    }))

            localStorage.setItem('photoName', this.state.photoName)
        }
    }

    handleRenderModal = (photo) => {
        this.setState({
            showModal: true,
            photoModal: {
                url: photo.urls.regular,
                author: photo.user.name,
                location: photo.user.location
            }
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {

        return (
            <div className="photos_component">
                <Link to='/'>
                    <FaHome className="icon"/>
                </Link>
                <SearchBar
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    photoName={this.state.photoName}
                />
                {this.state.photos.results.length > 0 &&
                    <div className="photos_container">
                        {this.state.photos.results.map((photo) => {
                            return <img
                                key={photo.id}
                                src={photo.urls.small}
                                alt={photo.id}
                                className="photo"
                                onClick={() => this.handleRenderModal(photo)} />
                        })}
                    </div>}
                {this.state.showModal === true &&
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        photoModal={this.state.photoModal}
                    />
                }
            </div>
        )
    }
}

export default Photos;

