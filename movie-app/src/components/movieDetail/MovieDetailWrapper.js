import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import { FaSearch } from 'react-icons/fa';
import './MovieDetail.css'

const MovieDetailWrapper = () => {
    const movieInfo = useLoaderData();
    const navigate = useNavigate();

    return (
        <div className="movie-detail-container">
            <div className="icon-search-container">
                <button
                    className="icon-search-button"
                    onClick={() => { navigate("/") }}
                    title="Back to Search">
                    <FaSearch />
                </button>
            </div>
            <MovieDetail movieInfo={movieInfo} />
            <Outlet />
        </div>
    );
} 

export default MovieDetailWrapper;
