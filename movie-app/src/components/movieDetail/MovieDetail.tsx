import React, { FC } from 'react';
import './MovieDetail.css'
import { MovieInfo } from '../../types/MovieInfo';

interface IMovieDetail {
    movieInfo: MovieInfo;
}

const MovieDetail: FC<IMovieDetail> = ({movieInfo}) => {
    return (
        <div className="movie-detail">
            <img src={movieInfo.poster_path} alt={movieInfo.title}/>
            <div className="movie-detail-info">
                <div className="movie-detail-header">
                    <div className="movie-detail-name">{movieInfo.title}</div>
                    <div className="movie-detail-rating">{movieInfo.vote_average}</div>
                </div>
                <div className="movie-detail-genres">{movieInfo.genres?.join(",")}</div>
                <div className="movie-detail-middle">
                    <h2>{movieInfo.release_date}</h2>
                    <h2>{movieInfo.runtime}</h2>
                </div>
                <p>{movieInfo.overview}</p>
            </div>
        </div>
    )
}

export default MovieDetail