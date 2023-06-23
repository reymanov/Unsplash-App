import React from "react";
import { GoSearch } from "react-icons/go";
import "../style.css";

const SearchBar = ({
  suggestionSelect,
  handleChange,
  suggestions,
  noSuggestions,
  photoName,
  handleSubmit,
}) => {
  const handleSelection = async (e, item) => {
    await suggestionSelect(item);
    await handleSubmit(e);
  };

  const informNoSuggestions = () => {
    if (noSuggestions === true) {
      return (
        <ul className="suggestions_ul">
          <li>No suggestions...</li>
        </ul>
      );
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="suggestions_ul">
        {suggestions.map((item) => (
          <li
            className="suggestions_item"
            onClick={(e) => handleSelection(e, item)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="search_container">
      <h1 className="title">Photo App</h1>
      <form>
        <GoSearch className="search_icon" />
        <input
          onChange={handleChange}
          className="searchbar"
          type="text"
          value={photoName}
          name="photo"
          placeholder="Type and press enter to search..."
        />
        {renderSuggestions()}
        {informNoSuggestions()}
        <button
          type="submit"
          onClick={handleSubmit}
          style={{ display: "none" }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
