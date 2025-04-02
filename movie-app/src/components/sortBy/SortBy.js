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
                id="sort-by-list"
                value={currentSelection}
                onChange={handleChange}
            >
                <option value="Release Date">RELEASE DATE</option>
                <option value="Title">TITLE</option>
            </select>    
        </div>
    );
};

export default SortBy;