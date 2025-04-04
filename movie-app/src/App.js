import React from 'react';
import Counter from './components/counter/Counter';
import Search from './components/search/Search';
import Genre from './components/genre/Genre';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenre: "Drama"
    };
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
      })
    );
  }
}

export default App;
