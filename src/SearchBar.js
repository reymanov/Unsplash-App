import React from 'react'
import { Link } from 'react-router-dom'
import './style.css';

class SearchBar extends React.Component {

    render() {
        return (
                <div className="search_container">
                    <h1 className="title">Search for Photos</h1>
                    <form>
                        <input onChange={this.props.handleChange} className='searchbar' type='text' value={this.props.photoName} name='photo' placeholder="What photos do You want ?"></input>
                        <button type='submit' onClick={this.props.handleSubmit} style={{display:'none'}}>Search</button>
                    </form>
                </div>
        )
    }
}

export default SearchBar;
