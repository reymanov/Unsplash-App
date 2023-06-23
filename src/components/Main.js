import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { autocompleteItems } from "../constants/autocompleteItems";
import "../style.css";
import MobileSVG from "../Images/mobile.svg";

const Main = () => {
  const [photoName, setPhotoName] = useState("");
  const [clientID] = useState("CGJ2fNev_5sMed70cHIs7u9fKQZKeumnJkKpVPtxAKI");
  const [photos, setPhotos] = useState({ results: [] });
  const [redirectToPhotos, setRedirectToPhotos] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [noSuggestions, setNoSuggestions] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    let newSuggestions = [];
    setNoSuggestions(false);

    if (value.length >= 3) {
      const regex = new RegExp(`^${value}`, "i");
      newSuggestions = autocompleteItems.sort().filter((v) => regex.test(v));
    }

    if (value.length >= 3 && newSuggestions.length === 0) {
      newSuggestions = [];
      setNoSuggestions(true);
    }

    setPhotoName(value);
    setSuggestions(newSuggestions);
  };

  const suggestionSelect = (value) => {
    setPhotoName(value);
    setSuggestions([]);
    localStorage.setItem("photoName", value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (photoName.length >= 3) {
      localStorage.setItem("photoName", photoName);

      fetch(
        `https://api.unsplash.com/search/photos?per_page=10&query=${photoName}&client_id=${clientID}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data);
          setPhotoName("");
          setRedirectToPhotos(true);
          setSuggestions([]);
        });
    }
  };

  if (redirectToPhotos) {
    return <Navigate to="/photos" />;
  }

  return (
    <div className="home_container">
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        photoName={photoName}
        autocompleteItems={autocompleteItems}
        suggestions={suggestions}
        noSuggestions={noSuggestions}
        suggestionSelect={suggestionSelect}
      />
      <img src={MobileSVG} alt="mobilesvg" className="mobilesvg" />
    </div>
  );
};

export default Main;
