import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import Dialog from "../dialog/Dialog";
import MovieForm from "../movieForm/MovieForm";

const EditMovieForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const movieInfo = useLoaderData();

    const handleClose = () => {
        navigate(`/?${searchParams.toString()}`);
    }

    const handleSubmit = async (values) => {
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