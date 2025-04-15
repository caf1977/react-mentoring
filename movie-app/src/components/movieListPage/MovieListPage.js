import { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieListPage.css';
import Search from "../search/Search";
import Genre from "../genre/Genre";
import SortBy from "../sortBy/SortBy";
import MovieTile from "../movieTile/MovieTile";
import MovieDetail from "../movieDetail/MovieDetail";

const MovieListPage = () => {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("ALL");
    const [sortBy, setSortBy] = useState("Title");
    const [movieInfo, setMovieInfo] = useState();
    const [movies, setMovies] = useState([]);

    const initialGenres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

    
    const tempMovies = [
        {
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
            movieName: "Spider Man",
            releaseYear: 2020,
            rating: "8.8",
            duration: "120 minutes",
            description: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War.",
            genres: ["Action", "Sci-Fi"],
        },
        {
            imageUrl: "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            movieName: "Mission Impossible",
            releaseYear: 2018,
            rating: "7.5",
            duration: "180 minutes",
            description: "Hunt and his team are tasked with stopping an enemy force or preventing a global disaster",
            genres: ["Drama", "Thriller"],
        },
        {
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
            movieName: "Star Wars",
            releaseYear: 2000,
            rating: "9.1",
            duration: "110 minutes",
            description: "Rey develops her abilities with the help of Luke Skywalker as the Resistance prepares for battle against the First Order",
            genres: ["Sci-Fi", "Action"],
        },
        {
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPJssUGY-RYbJuGimU6XPlIoferx9hbMemA&s",
            movieName: "Lord Of The Rings",
            releaseYear: 2015,
            rating: "9.8",
            duration: "180 minutes",
            description: "The second chapter in the epic story of Middle-earth pits you against Sauron and the evil forces of Mordor.",
            genres: ["Action", "Sci-Fi"],
        },
        {
            imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_20cs_avatarwayofwater_mayupdate_1710_260aa445.jpeg",
            movieName: "Avatar",
            releaseYear: 2022,
            rating: "6.0",
            duration: "100 minutes",
            description: "“Avatar: The Way of Water” begins to tell the story of the Sully family, the battles they fight to stay alive, and the tragedies they endure",
            genres: ["Drama", "Thriller"],
        }
    ];

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
                        genre,
                        sortBy
                    },
                    signal: controller.signal,
                });

                setMovies(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Previous request canceled:', error.message);
                } else {
                    console.error('Error fetching movies:', error);
                }
            }
        };
        setMovies(tempMovies);
        //fetchMovies();

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