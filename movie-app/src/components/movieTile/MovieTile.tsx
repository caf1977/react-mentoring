import React, { FC, useState, MouseEvent } from 'react';
import './MovieTile.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MovieInfo } from '../../types/MovieInfo';

interface IMovieTile {
    movieInfo: MovieInfo;
    onClick?: (movie: MovieInfo) =>void;
}

const MovieTile: FC<IMovieTile> = ({movieInfo, onClick}) => {
    const [searchParams] = useSearchParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuToggle = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate(`/${movieInfo.id}/edit?${searchParams.toString()}`);
        setMenuOpen(false);
    };

    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setMenuOpen(false); 
    };

    return (
        <div data-testid="info" className="movie-tile" onClick={() => onClick?.(movieInfo)}>
            <div className="image-container">
                <img src={movieInfo.poster_path} alt={movieInfo.title}/>
                <button className="three-dots-button" onClick={handleMenuToggle}>
                    &#8230;
                </button>
                
                {menuOpen && (
                    <div className="menu">
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
            <div className="movie-tile-info">
                <h3>{movieInfo.title}</h3>
                <div className="movie-tile-info-year">
                    <h2>
                        {movieInfo.release_date}
                    </h2>
                </div>
            </div>
            <p>{movieInfo.genres.join(",")}</p>
        </div>
    )
};

export default MovieTile;