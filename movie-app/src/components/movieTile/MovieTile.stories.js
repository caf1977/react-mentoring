import { fn } from '@storybook/test';
import { MemoryRouter } from "react-router-dom";
import MovieTile from "./MovieTile";

export default {
    title: "Movie Tile",
    component: MovieTile,
    tags: ['autodocs'],
    args: {
        movieInfo: {
            poster_path: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
            title: "Spider Man",
            release_date: 2020,
            genres: ["Action", "Sci-Fi"],
        },
        onClick: fn(),
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

export const Tile = {
}