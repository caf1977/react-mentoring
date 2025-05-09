import React, { useState, useEffect } from 'react';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieListPage.css';
import Genre from "../genre/Genre";
import SortBy from "../sortBy/SortBy";
import MovieTile from "../movieTile/MovieTile";

const MovieListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const search = searchParams.get("search") || "";
    const genre = searchParams.get("genre") || "ALL";
    const sortBy = searchParams.get("sortBy") || "title";
    const refresh = searchParams.get("refresh");

    const [movies, setMovies] = useState([]);

    const initialGenres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"]; 

    const updateSearchParams = (newParams) => {
        setSearchParams((prev) => {
            const updated = new URLSearchParams(prev);
            Object.entries(newParams).forEach(([key, value]) => {
                if (value) {
                    updated.set(key, value);
                } else {
                    updated.delete(key);
                }
            });
            return updated;
        });
    };

    const handleSelectedGenre = (selectedGenre) => {
        updateSearchParams({ genre: selectedGenre });
    };

    const handleSelectedSort = (selectedSortBy) => {
        updateSearchParams({ sortBy: selectedSortBy });
    };

    const handleMovieTileClick = (movieId) => {
        navigate(`/${movieId}?${searchParams.toString()}`);
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
                        searchBy: "title",
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

        if (refresh) {
            setSearchParams((prev) => {
                const updated = new URLSearchParams(prev);
                updated.delete("refresh");
                return updated;
            });
        }

        return () => {
            // Cleanup function to abort previous request if the component unmounts
            // or if parameters change before request completes.
            controller.abort();
        };
    }, [search, genre, sortBy, refresh, setSearchParams]);

    return (
        <div className="page-container">
            <Outlet />

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
                <div data-testid="counter" style={{ color: "white", fontFamily: "small", fontWeight: "lighter" }}>
                    <b>{movies.length}</b> movies found
                </div>
                <div className="movie-tile-container">
                    {movies.map((movie) => {
                        return (
                            <MovieTile
                                movieInfo={movie}
                                onClick={() => handleMovieTileClick(movie.id)}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MovieListPage;