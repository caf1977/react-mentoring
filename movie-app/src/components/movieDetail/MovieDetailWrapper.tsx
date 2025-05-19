import React, { FC } from 'react';
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import { FaSearch } from 'react-icons/fa';
import './MovieDetail.css'
import { MovieInfo } from '../../types/MovieInfo';

const MovieDetailWrapper: FC = () => {
    const movieInfo = useLoaderData() as MovieInfo;
    const navigate = useNavigate();

    return (
        <div className="movie-detail-container">
            <div className="icon-search-container">
                <button
                    className="icon-search-button"
                    onClick={() => { navigate("/") }}
                    title="Back to Search"
                >
                    <FaSearch />                  
                </button>
            </div>
            <MovieDetail movieInfo={movieInfo} />
            <Outlet />
        </div>
    );
} 

export default MovieDetailWrapper;
