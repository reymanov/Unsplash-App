import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "../style.css";
import Modal from "./Modal";
import { autocompleteItems } from "../constants/autocompleteItems";

const Photos = () => {
  const [clientID] = useState("CGJ2fNev_5sMed70cHIs7u9fKQZKeumnJkKpVPtxAKI");
  const [photos, setPhotos] = useState({ results: [] });
  const [photoName, setPhotoName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [photoModal, setPhotoModal] = useState({
    url: "",
    author: "",
    location: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [noSuggestions, setNoSuggestions] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?per_page=100&query=${localStorage.getItem(
        "photoName"
      )}&client_id=${clientID}`
    )
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, [clientID]);

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (photoName.length >= 3) {
      fetch(
        `https://api.unsplash.com/search/photos?query=${photoName}&client_id=${clientID}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data);
          setPhotoName("");
          setSuggestions([]);
          setNoSuggestions(true);
        });
    }
  };

  const handleRenderModal = (photo) => {
    setPhotoModal({
      url: photo.urls.regular,
      author: photo.user.name,
      location: photo.user.location,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="photos_component">
      <Link to="/">
        <FaHome className="icon" />
      </Link>
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        photoName={photoName}
        autocompleteItems={autocompleteItems}
        suggestions={suggestions}
        noSuggestions={noSuggestions}
        suggestionSelect={suggestionSelect}
      />
      {photos.results.length > 0 && (
        <div className="photos_container">
          {photos.results.map((photo) => (
            <img
              key={photo.id}
              src={photo.urls.small}
              alt={photo.id}
              className="photo"
              onClick={() => handleRenderModal(photo)}
            />
          ))}
        </div>
      )}
      {showModal === true && (
        <Modal handleCloseModal={handleCloseModal} photoModal={photoModal} />
      )}
    </div>
  );
};

export default Photos;
