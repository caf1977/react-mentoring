import './MovieDetail.css'

const MovieDetail = ({movieInfo}) => {
    return (
        <div className="movie-detail">
            <img src={movieInfo.imageUrl} alt={movieInfo.movieName}/>
            <div className="movie-detail-info">
                <p><b>Name:</b> {movieInfo.movieName}</p>
                <p><b>Release year:</b> {movieInfo.releaseYear}</p>
                <p><b>Rating:</b> {movieInfo.rating}</p>
                <p><b>Duration:</b> {movieInfo.duration}</p>
                <p><b>Description:</b> {movieInfo.description}</p>
            </div>
        </div>
    )
}

export default MovieDetail