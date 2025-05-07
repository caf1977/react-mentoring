import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "../dialog/Dialog";
import MovieForm from "../movieForm/MovieForm";

const AddMovieForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(`/?${searchParams.toString()}`);
    }

    const handleSubmit = async (values) => {
        try {
            const response = await fetch("http://localhost:4000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Failed to add movie");
            }

            const data = await response.json();
            if(data && data.id) {
                navigate(`/${data.id}`);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error adding movie", error);
        }
    }

    return (
        <Dialog title="ADD MOVIE" onClose={handleClose}>
            <MovieForm onSubmit={handleSubmit} />
        </Dialog>
    );
}

export default AddMovieForm;