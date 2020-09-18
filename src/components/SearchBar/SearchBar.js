// You do not need to change any code in this file for MVP
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faCircle, faCompass } from "@fortawesome/free-regular-svg-icons";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  function toggleDarkMode() {
    // Get the body
    const body = document.querySelector("body");

    // Toggle dark mode class
    body.classList.toggle("dark-mode");

    // Toggle dark mode state
    setDarkMode(!darkMode);
  }

  return (
    <div className="search-bar-wrapper">
      <div className="social">
        <FontAwesomeIcon icon={faInstagram} />
      </div>
      <form onSubmit={(e) => props.searchPosts(e, searchStr)} className="search-form">
        <input
          type="text"
          placeholder="Search"
          value={searchStr}
          onChange={(text) => setSearchStr(text.target.value)}
        />
      </form>
      <div className="social-wrapper">
        <button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
        <div className="social">
          <FontAwesomeIcon icon={faCompass} />
        </div>
        <div className="social">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="social">
          <FontAwesomeIcon icon={faCircle} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
