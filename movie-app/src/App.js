import React from 'react';
import Counter from './components/counter/Counter';
import Search from './components/search/Search';
import Genre from './components/genre/Genre';
import MovieTile from './components/movieTile/MovieTile';
import MovieDetail from './components/movieDetail/MovieDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenre: "Drama"
    };
    this.movies = [
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
        movieName: "Spider Man",
        releaseYear: 2020,
        rating: "PG",
        duration: "120 minutes",
        description: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War.",
        genres: ["Action", "Sci-Fi"],
      },
      {
        imageUrl: "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        movieName: "Mission Impossible",
        releaseYear: 2018,
        rating: "PG-13",
        duration: "180 minutes",
        description: "Hunt and his team are tasked with stopping an enemy force or preventing a global disaster",
        genres: ["Drama", "Thriller"],
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
        movieName: "Star Wars",
        releaseYear: 2000,
        rating: "G",
        duration: "110 minutes",
        description: "Rey develops her abilities with the help of Luke Skywalker as the Resistance prepares for battle against the First Order",
        genres: ["Sci-Fi", "Action"],
      }
    ]
    this.handleSelectedGenre = this.handleSelectedGenre.bind(this);
  }

  handleSearch = (query) => {
    alert(`Search triggered with query: ${query}`);
  }

  handleSelectedGenre = (genre) => {
    this.setState({
      selectedGenre: genre
    });
  }

  handleMovieTileClick = (movieInfo) => {
    alert(`Movie tile clicked: ${movieInfo.movieName}`);
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Counter, { initialValue: 0 }),
      React.createElement(Search, { 
        initialQuery: "",
        onSearch: this.handleSearch
      }),
      React.createElement(Genre, {
        initialGenres: ["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"],
        selectedGenre: this.state.selectedGenre,
        onSelect: this.handleSelectedGenre
      }),
      React.createElement("div", {style: {margin: "20px", display: "flex"}},
        this.movies.map((movie) => (
          React.createElement(MovieTile, {
            movieInfo: movie,
            onClick: this.handleMovieTileClick,
          })
        ))
      ),
      React.createElement("div", {style: {margin: "20px"}},
        React.createElement(MovieDetail, {
          movieInfo: this.movies[0],
        })
      )
    );
  }
}

export default App;
