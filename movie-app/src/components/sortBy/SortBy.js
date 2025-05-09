import React from 'react';
import './SortBy.css';

const SortBy = ({
    currentSelection = "",
    onSelectionChange,
}) => {
    const handleChange = (event) => {
        const newValue = event.target.value;
        onSelectionChange(newValue);
    }

    return (
        <div className="sort-by-container">
            <label htmlFor="sort-by-list">
                SORT BY:
            </label>
            <select
                className="sort-by-list"
                id="sort-by-list"
                value={currentSelection}
                onChange={handleChange}
            >
                <option value="release_date">RELEASE DATE</option>
                <option value="title">TITLE</option>
            </select>    
        </div>
    );
};

export default SortBy;