import './MovieTile.css'

const MovieTile = ({movieInfo, onClick}) => {
    return (
        <div className="movie-tile" onClick={() => onClick(movieInfo)}>
            <img src={movieInfo.imageUrl} alt={movieInfo.movieName}/>
            <div className="movie-tile-info">
                <h3>{movieInfo.movieName}</h3>
                <div className="movie-tile-info-year">
                    <h2>
                        {movieInfo.releaseYear}
                    </h2>
                </div>
            </div>
            <p>{movieInfo.genres.join(",")}</p>
        </div>
    )
};

export default MovieTile;