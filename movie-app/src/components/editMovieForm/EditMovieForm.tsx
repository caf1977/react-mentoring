import React, { FC } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "../dialog/Dialog";
import MovieForm from '../movieForm/MovieForm';
import { MovieInfo } from '../../types/MovieInfo';

const EditMovieForm: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const movieInfo = useLoaderData() as MovieInfo;

    const handleClose = () => {
        navigate(`/?${searchParams.toString()}`);
    }

    const handleSubmit = async (values: MovieInfo) => {
        try {
            const response = await fetch("http://localhost:4000/movies", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Failed to edit movie");
            }

            const data = await response.json();
            if(data && data.id) {
                navigate(`/${data.id}?${searchParams.toString()}&refresh=true`);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error editing movie", error);
        }
    }

    return (
        <Dialog title="EDIT MOVIE" onClose={handleClose}>
            <MovieForm initialMovie={movieInfo} onSubmit={handleSubmit} />
        </Dialog>
    );
}

export default EditMovieForm;