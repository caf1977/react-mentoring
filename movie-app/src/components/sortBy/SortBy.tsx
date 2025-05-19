import React, { ChangeEvent, FC } from 'react';
import './SortBy.css';

interface ISortBy {
    currentSelection?: string;
    onSelectionChange?: (selection: string) => void;
}

const SortBy: FC<ISortBy> = ({
    currentSelection = "",
    onSelectionChange,
}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        onSelectionChange?.(newValue);
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