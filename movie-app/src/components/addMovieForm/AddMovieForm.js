import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "../dialog/Dialog";

const AddMovieForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(`/?${searchParams.toString()}`);
    }

    return (
        <Dialog title="Add Movie Dialog" onClose={ handleClose }>
            <h1>Add Movie Form</h1>
        </Dialog>
    );
}

export default AddMovieForm;