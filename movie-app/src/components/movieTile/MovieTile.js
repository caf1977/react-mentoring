import './MovieTile.css'

const MovieTile = ({movieInfo, onClick}) => {
    return (
        <div data-testid="info" className="movie-tile" onClick={() => onClick(movieInfo)}>
            <img src={movieInfo.poster_path} alt={movieInfo.title}/>
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