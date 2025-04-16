import { fn } from '@storybook/test';
import MovieForm from "./MovieForm";

export default {
    title: "Movie Form",
    component: MovieForm,
    tags: ['autodocs'],
    args: {
        onSubmit: fn(),
    }
}

export const AddMovie = {
}

export const EditMovie = {
    args: {
        initialMovie: {
            title: "Star Wars",
            releaseDate: "2008-05-12",
            movieUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
            rating: 5.5,
            genres: ["Horror", "Comedy"],
            runtime: "120 minutes",
            overview: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War."
        }
    }
}
