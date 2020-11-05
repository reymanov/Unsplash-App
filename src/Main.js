import React from 'react'
import SearchBar from './SearchBar';
import { Redirect } from 'react-router-dom'
import './style.css';
import MobileSVG from './Images/mobile.svg'

class Main extends React.Component {
    autocompleteItems = [
        'Dog',
        'Car',
        'Island',
        'Nature',
        'Moutains',
        'Beach',
        'Travel',
        'Landscape',
        'Iceland',
        'Swiss',
        'Airplane',
        'Work',
        'Friends',
        'Canada',
        'Africa',
        'Belize',
        'Hongkong',
        'Taiwan',
        'Architecture'
    ]

    state = {
        photoName: '',
        clientID: 'CGJ2fNev_5sMed70cHIs7u9fKQZKeumnJkKpVPtxAKI',
        photos: {
            results: []
        },
        redirectToPhotos: false,
        suggestions: [],
        noSuggestions: false,
    }

    handleChange = (event) => {
        const value = event.target.value;
        let newSuggestions = [];
        this.setState({
            noSuggestions: false
        })

        if (value.length >= 3) {
            const regex = new RegExp(`^${value}`, 'i');
            newSuggestions = this.autocompleteItems.sort().filter(v => regex.test(v));
        }
        
        if(value.length >= 3 && newSuggestions.length === 0){
            newSuggestions = [];
            this.setState({
                noSuggestions: true
            })
        }

        this.setState({
            photoName: event.target.value,
            suggestions: newSuggestions
        })
    }

    suggestionSelect = (value) => {
        this.setState({
            photoName: value,
            suggestions: [],
        })

        localStorage.setItem('photoName',value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.photoName.length >= 3) {

            fetch(`https://api.unsplash.com/search/photos?query=${this.state.photoName}&client_id=${this.state.clientID}`)
                .then(res => res.json())
                .then(data =>
                    this.setState({
                        photos: data,
                        photoName: '',
                        redirectToPhotos: true,
                        suggestions: [],
                    }))

            // localStorage.setItem('photoName', this.state.photoName)
        }
    }

    render() {
        if (this.state.redirectToPhotos === true) {
            return <Redirect to="/photos" />
        }
        return (
            <div className='home_container'>
                <SearchBar
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    photoName={this.state.photoName}
                    autocompleteItems={this.autocompleteItems}
                    suggestions={this.state.suggestions}
                    noSuggestions={this.state.noSuggestions}
                    suggestionSelect={this.suggestionSelect}
                />
                <img src={MobileSVG} alt="mobilesvg" className="mobilesvg" />
            </div>
        )
    }
}

export default Main
