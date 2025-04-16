import { Component } from 'react';
import './MovieForm.css';

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.initialMovie?.title || "",
            releaseDate: props.initialMovie?.releaseDate || "",
            movieUrl: props.initialMovie?.movieUrl || "",
            rating: props.initialMovie?.rating || "",
            genres: props.initialMovie?.genres || [],
            genreListOpen: false,
            runtime: props.initialMovie?.runtime || "",
            overview: props.initialMovie?.overview || "", 
            clickedButton: props.initialMovie?.clickedButton || "", 
        }
    }

    handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "genres") {
            const genres = [...this.state.genres];
            if (checked) {
              genres.push(value);
            } else {
              const index = genres.indexOf(value);
              if (index > -1) {
                genres.splice(index, 1);
              }
            }
            this.setState({ genres });
          } else {
            this.setState({ [name]: value });
          }
    };

    handleGenreListToggle = () => {
        this.setState((prevState) => ({ genreListOpen: !prevState.genreListOpen }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const { clickedButton } = this.state;

        if (clickedButton === "submit") {
            const movieInfo = {...this.state}
            onSubmit(movieInfo);
        } else {
            this.setState({
                title: "",
                releaseDate: "",
                movieUrl: "",
                genres: [],
                rating: "",
                runtime: "",
                overview: "",
              });
        }
    };

    render() {
        const { title, releaseDate, movieUrl, rating, genres, genreListOpen, runtime, overview } = this.state;
        const genreOptions = ["Crime", "Documentary", "Horror", "Comedy"];

        return (
            <form className="movie-form" onSubmit={this.handleSubmit} data-testid="movie-form">
                <h2>{this.props.initialMovie ? "EDIT MOVIE" : "ADD MOVIE"}</h2>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">TITLE</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="releaseDate">RELEASE DATE</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={releaseDate}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="movieUrl">MOVIE URL</label>
                        <input
                            type="text"
                            id="movieUrl"
                            name="movieUrl"
                            value={movieUrl}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">RATING</label>
                        <input
                            type="text"
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>GENRE</label>
                        <div className="dropdown-menu">
                            <button
                                type="button"
                                className="dropdown-toggle"
                                onClick={this.handleGenreListToggle}
                            >
                                Select Genre
                            </button>
                            {genreListOpen && (
                                <div>
                                    {genreOptions.map((genre) => (
                                        <label key={genre} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                name="genres"
                                                value={genre}
                                                checked={genres.includes(genre)}
                                                onChange={this.handleChange}
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="runtime">RUNTIME</label>
                        <input
                            type="text"
                            id="runtime"
                            name="runtime"
                            value={runtime}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="overview">OVERVIEW</label>
                    <textarea className="form-group textarea-group"
                        id="overview"
                        name="overview"
                        value={overview}
                        onChange={this.handleChange}
                        placeholder="Movie description"
                        rows="8"
                    />
                </div>
                <div className="form-footer">
                    <button 
                        type="submit" 
                        className="form-button" 
                        value="reset" 
                        name="reset"
                        onClick={() => this.setState({ clickedButton: "reset" })}
                    >
                        RESET
                    </button>
                    <button 
                        type="submit" 
                        className="form-button" 
                        value="submit" 
                        name="submit"
                        onClick={() => this.setState({ clickedButton: "submit" })}
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        );
    }
}

export default MovieForm;