import React from "react";
import './Genre.css';

interface IGenre {
    initialGenres: string[];
    selectedGenre?: string;
    onSelect?: (genre: string) => void;
}

class Genre extends React.Component<IGenre> {
    constructor(props: IGenre) {
        super(props);
        this.handleGenreClick = this.handleGenreClick.bind(this);
    }

    handleGenreClick = (genre: string) => {
        this.props.onSelect?.(genre);
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