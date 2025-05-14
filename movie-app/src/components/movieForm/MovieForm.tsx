import React, { ChangeEvent, FC, useState } from 'react';
import './MovieForm.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MovieInfo } from '../../types/MovieInfo';

interface IMovieForm {
    initialMovie?: MovieInfo;
    onSubmit?: (movieInfo: MovieInfo) => void;
}

type MovieFormErrors = {
    title?: string;
    release_date?: string;
    poster_path?: string;
    vote_average?: string;
    runtime?: string;
    overview?: string;
};

type FormikHelpers = {
    resetForm: () => void;
};

const MovieForm: FC<IMovieForm> = ({ initialMovie, onSubmit }) => {
    const [genreListOpen, setGenreListOpen] = useState(false);

    const genreOptions = ["Crime", "Documentary", "Horror", "Comedy"];

    const initialValues: MovieInfo = {
        id: initialMovie?.id,
        title: initialMovie?.title || "",
        release_date: initialMovie?.release_date || "",
        poster_path: initialMovie?.poster_path || "",
        vote_average: initialMovie?.vote_average || "",
        genres: initialMovie?.genres || [],
        runtime: initialMovie?.runtime || "",
        overview: initialMovie?.overview || "",
    };

    const validateForm = (values: MovieInfo) => {
        const errors: MovieFormErrors = {};
        if (!values.title) {
            errors.title = "Required";
        }
        if (!values.release_date) {
            errors.release_date = "Required";
        }
        if (!values.poster_path) {
            errors.poster_path = "Required";
        }
        if (!values.vote_average) {
            errors.vote_average = "Required";
        }
        if (!values.runtime) {
            errors.runtime = "Required";
        }
        if (!values.overview) {
            errors.overview = "Required";
        }
        return errors;
    };

    const handleGenresChange = (e: ChangeEvent<HTMLInputElement>, values: MovieInfo, setFieldValue: (field: string, value: string[]) => void) => {
        const { checked, value } = e.target;

        if (checked) {
            setFieldValue("genres", [...values.genres, value]);
        } else {
            setFieldValue(
                "genres",
                values.genres.filter((genre) => genre !== value)
            );
        }
    };

    const handleSubmit = (values: MovieInfo, { resetForm }: FormikHelpers, action: string) => {
        if (action === "submit") {
            onSubmit?.(values);
        } else if (action === "reset") {
            resetForm();
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={(values, helpers) => handleSubmit(values, helpers, "submit")}
        >
            {({ values, setFieldValue, resetForm }) => (
                <Form className="movie-form" data-testid="movie-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">TITLE</label>
                            <Field type="text" id="title" name="title" />
                            <ErrorMessage name="title" component="div" className="error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="release_date">RELEASE DATE</label>
                            <Field type="date" id="release_date" name="release_date" />
                            <ErrorMessage name="release_date" component="div" className="error" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="poster_path">MOVIE URL</label>
                            <Field type="text" id="poster_path" name="poster_path" />
                            <ErrorMessage name="poster_path" component="div" className="error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vote_average">RATING</label>
                            <Field type="number" id="vote_average" name="vote_average" />
                            <ErrorMessage name="vote_average" component="div" className="error" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>GENRE</label>
                            <div className="dropdown-menu">
                                <button
                                    type="button"
                                    className="dropdown-toggle"
                                    onClick={() => setGenreListOpen(!genreListOpen)}
                                >
                                    Select Genre
                                </button>
                                {genreListOpen && (
                                    <div>
                                        {genreOptions.map((genre) => (
                                            <label key={genre} className="checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    name="genres"
                                                    value={genre}
                                                    checked={values.genres.includes(genre)}
                                                    onChange={(e) => handleGenresChange(e, values, setFieldValue)}
                                                />
                                                {genre}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <ErrorMessage name="genres" component="div" className="error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="runtime">RUNTIME</label>
                            <Field type="number" id="runtime" name="runtime" />
                            <ErrorMessage name="runtime" component="div" className="error" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="overview">OVERVIEW</label>
                        <Field
                            as="textarea"
                            id="overview"
                            name="overview"
                            placeholder="Movie description"
                            rows="8"
                        />
                        <ErrorMessage name="overview" component="div" className="error" />
                    </div>
                    <div className="form-footer">
                        <button
                            type="button"
                            className="form-button"
                            onClick={() => handleSubmit(values, { resetForm }, "reset")}
                        >
                            RESET
                        </button>
                        <button
                            type="submit"
                            className="form-button"
                            onClick={() => handleSubmit(values, { resetForm }, "submit")}
                        >
                            SUBMIT
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MovieForm;