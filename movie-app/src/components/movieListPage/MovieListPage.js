import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './MovieListPage.css';
import Search from "../search/Search";
import Genre from "../genre/Genre";
import SortBy from "../sortBy/SortBy";
import MovieTile from "../movieTile/MovieTile";
import MovieDetail from "../movieDetail/MovieDetail";

const MovieListPage = () => {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("ALL");
    const [sortBy, setSortBy] = useState("title");
    const [movieInfo, setMovieInfo] = useState();
    const [movies, setMovies] = useState([]);

    const initialGenres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"]; 

    const handleSearch = (query) => {
        setSearch(query);
    };

    const handleSelectedGenre = (selectedGenre) => {
        setGenre(selectedGenre);
    };

    const handleSelectedSort = (selectedSortBy) => {
        setSortBy(selectedSortBy);
    };

    const handleMovieTileClick = (selectedMovie) => {
        setMovieInfo(selectedMovie);
    };

    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:4000/movies', {
                    params: {
                        search,
                        filter: (genre === "ALL" ? "" : genre),
                        sortBy,
                        sortOrder: "asc",
                        searchBy: "title"
                    },
                    signal: controller.signal,
                });
                setMovies(response.data.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Previous request canceled:', error.message);
                } else {
                    console.error('Error fetching movies:', error);
                }
            }
        };
        fetchMovies();

        return () => {
            // Cleanup function to abort previous request if the component unmounts
            // or if parameters change before request completes.
            controller.abort();
        };
    }, [search, genre, sortBy]); // Effect runs when search, genre, or sortBy changes.

    return (
        <div className="page-container">
            {movieInfo ? (
                <div className="movie-detail-container">
                    <div className="icon-search-container">
                        <button 
                            className="icon-search-button" 
                            onClick={() => { setMovieInfo(null) }} 
                            title="Back to Search">
                            <FaSearch />
                        </button>                    
                    </div>
                    <MovieDetail movieInfo={movieInfo} />
                </div>
            ) : (
                <Search initialQuery={search} onSearch={handleSearch} />
            )}
            <div className="body-container">
                <div className="search-bar">
                    <Genre
                        initialGenres={initialGenres}
                        selectedGenre={genre}
                        onSelect={handleSelectedGenre}
                    />
                    <SortBy
                        currentSelection={sortBy}
                        onSelectionChange={handleSelectedSort}
                    />
                </div>
                <hr />
                <div style={{ color: "white", fontFamily: "small", fontWeight: "lighter" }}>
                    <b>{movies.length}</b> movies found
                </div>
                <div className="movie-tile-container">
                    {movies.map((movie) => {
                        return (
                            <MovieTile
                                movieInfo={movie}
                                onClick={handleMovieTileClick}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MovieListPage;