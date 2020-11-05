import React from 'react'
import { GoSearch } from 'react-icons/go'
import './style.css';

class SearchBar extends React.Component {

    handleSelection = (e,item) => {
        this.props.suggestionSelect(item);
        this.props.handleSubmit(e);
    }
    
    informNoSuggestions() {
        if (this.props.noSuggestions === true) {
            return <ul className='suggestions_ul'>
                <li>Brak Sugestii</li>
                    </ul>
        }
    }

    renderSuggestions() {
        const { suggestions } = this.props;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul className='suggestions_ul'>
                {suggestions.map((item) => <li
                    className="suggestions_item"
                    onClick={(e) => this.handleSelection(e,item)}
                    key={item}>{item}
                </li>)}
            </ul>
        )
    }

    render() {
        return (
            <div className="search_container">
                <h1 className="title">Search for Photos</h1>
                <form>
                    <GoSearch className="search_icon" />
                    <input onChange={this.props.handleChange} className='searchbar' type='text' value={this.props.photoName} name='photo' placeholder="What photos do You want ?"></input>
                    {this.renderSuggestions()}
                    {this.informNoSuggestions()}
                    <button type='submit' onClick={this.props.handleSubmit} style={{ display: 'none' }}>Search</button>
                </form>
            </div>
        )
    }
}

export default SearchBar;
