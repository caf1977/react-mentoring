import React from "react";
import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.initialQuery
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.triggerSearch = this.triggerSearch.bind(this);
    }

    handleInputChange = (event) => {
        this.setState(() => ({
          query: event.target.value
        }));
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
          this.triggerSearch();
        }
    }

    triggerSearch = () => {
        this.props.onSearch(this.state.query);
    }

    render() {
        return React.createElement(
            "div",
            {className: "search-container"},
            React.createElement("label", 
                {
                    htmlFor: "input-field",
                    className: "search-input-label"
                }, 
                "FIND YOUR MOVIE"
            ),
            React.createElement(
                "input",
                {
                    id: "input-field",
                    type: "text",
                    placeholder: "What do you want to watch?",
                    className: "search-input",
                    value: this.state.query,
                    onChange: this.handleInputChange,
                    onKeyDown: this.handleKeyPress
                }
            ),
            React.createElement(
                "button",
                {
                    className: "search-button",
                    onClick: this.triggerSearch
                },
                "SEARCH"
            )
        )
    }
}

export default Search;