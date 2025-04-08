import './MovieDetail.css'

const MovieDetail = ({movieInfo}) => {
    return (
        <div className="movie-detail">
            <img src={movieInfo.imageUrl} alt={movieInfo.movieName}/>
            <div className="movie-detail-info">
                <div className="movie-detail-header">
                    <div className="movie-detail-name">{movieInfo.movieName}</div>
                    <div className="movie-detail-rating">{movieInfo.rating}</div>
                </div>
                <div className="movie-detail-genres">{movieInfo.genres.join(",")}</div>
                <div className="movie-detail-middle">
                    <h2>{movieInfo.releaseYear}</h2>
                    <h2>{movieInfo.duration}</h2>
                </div>
                <p>{movieInfo.description}</p>
            </div>
        </div>
    )
}

export default MovieDetail