import React from "react";
import './Genre.css';

class Genre extends React.Component {
    constructor(props) {
        super(props);
        this.handleGenreClick = this.handleGenreClick.bind(this);
    }

    handleGenreClick = (genre) => {
        this.props.onSelect(genre);
    }

    render() {
        return React.createElement(
            "div",
            {className: "genre-container"},
            this.props.initialGenres.map((genre) =>
                React.createElement(
                    "button",
                    {
                        className: genre === this.props.selectedGenre ? "genre-button selected" : "genre-button",
                        onClick: () => this.handleGenreClick(genre),
                        key: genre
                    },
                    genre
                )
            )
        )
    }
}

export default Genre;