import { fn } from '@storybook/test';
import { MemoryRouter } from "react-router-dom";
import MovieForm from "./MovieForm";

export default {
    title: "Movie Form",
    component: MovieForm,
    tags: ['autodocs'],
    args: {
        onSubmit: fn(),
    },
    decorators: [
        (Story) => (
            // Wrap the component in a Router context
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
}

export const AddMovie = {
}

export const EditMovie = {
    args: {
        initialMovie: {
            title: "Star Wars",
            release_date: "2008-05-12",
            poster_path: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
            vote_average: 5.5,
            genres: ["Horror", "Comedy"],
            runtime: "120",
            overview: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War."
        }
    }
}
