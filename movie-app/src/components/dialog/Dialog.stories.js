import Dialog from "./Dialog";
import MovieForm from '../movieForm/MovieForm';
import { Component } from 'react';

export default {
    title: "Custom Dialog",
    component: Dialog,
    tags: ['autodocs'],
}

class DialogStoryWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        }
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({ isDialogOpen: true });
                }}
                >
                    Show Modal
                </button>
                {this.state.isDialogOpen && (
                    <Dialog title="Custom Dialog" onClose={this.handleClose}>
                        <p>This is a test modal dialog</p>
                        <p>Use the close button or click outside dialog to close the modal</p>
                    </Dialog>
                )}
            </div>
        );
    }
}

class AddMovieDialogWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        }
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({ isDialogOpen: true });
                }}
                >
                    Show Modal
                </button>
                {this.state.isDialogOpen && (
                    <Dialog title="Add Movie Dialog" onClose={this.handleClose}>
                        <MovieForm onSubmit={this.handleClose} />
                    </Dialog>
                )}
            </div>
        );
    }
}

class EditMovieDialogWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        }
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const initialMovie = {
            title: "Star Wars",
            releaseDate: "2008-05-12",
            movieUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
            rating: "5.5",
            genres: ["Horror", "Comedy"],
            runtime: "120 minutes",
            genreListOpen: true,
            overview: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War."
        };

        return (
            <div>
                <button onClick={() => {
                    this.setState({ isDialogOpen: true });
                }}
                >
                    Show Modal
                </button>
                {this.state.isDialogOpen && (
                    <Dialog title="Edit Movie Dialog" onClose={this.handleClose}>
                        <MovieForm initialMovie={initialMovie} onSubmit={this.handleClose} />
                    </Dialog>
                )}
            </div>
        );
    }
}

class DeleteMovieDialogWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        }
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({ isDialogOpen: true });
                }}
                >
                    Show Modal
                </button>
                {this.state.isDialogOpen && (
                    <Dialog title="DELETE MOVIE" onClose={this.handleClose}>
                        <p>Are you sure you want to delete this movie?</p>
                        <div style={{
                                paddingTop: "15px", 
                                paddingBottom: "20px", 
                                textAlign: "right"}}>
                            <button 
                                name="delete"
                                onClick={this.handleClose}
                                style={{
                                    padding: "5px 30px", 
                                    backgroundColor: "#F65261",
                                    border: "1px solid #F65261", 
                                    color: "white"}}
                            >
                                CONFIRM
                            </button>
                        </div>
                    </Dialog>
                )}
            </div>
        );
    }
}

export const DefaultDialog = () => <DialogStoryWrapper />;
export const AddMovieDialog = () => <AddMovieDialogWrapper />;
export const EditMovieDialog = () => <EditMovieDialogWrapper />;
export const DeleteMovieDialog = () => <DeleteMovieDialogWrapper />;