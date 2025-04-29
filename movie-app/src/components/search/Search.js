import React, { useState } from "react";
import './Search.css';
import { useNavigate, useSearchParams } from "react-router";

const Search = ({ initialQuery = "", onSearch }) => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(initialQuery || "");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            triggerSearch();
        }
    }

    const triggerSearch = () => {
        onSearch(query);
    }

    const handleAddMovieClick = () => {
        // Redirect to the /new route
        navigate(`/new?${searchParams.toString()}`);
    }

    return (
        <div className="search-container">
            <div className="add-movie-container">
                <button
                    className="add-movie-button"
                    onClick={ handleAddMovieClick }
                >
                    + ADD MOVIE
                </button>
            </div>
            <label htmlFor="input-field" className="search-input-label">
                FIND YOUR MOVIE
            </label>
            <input
                id="input-field"
                type="text"
                placeholder="What do you want to watch?"
                className="search-input"
                value={ query }
                onChange={ handleInputChange }
                onKeyDown={ handleKeyPress }
            />
            <button
                className="search-button"
                onClick={ triggerSearch }
            >
                SEARCH
            </button>
        </div>
    );
}

export default Search;