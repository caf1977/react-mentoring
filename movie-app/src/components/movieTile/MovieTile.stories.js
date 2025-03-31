import { fn } from '@storybook/test';
import MovieTile from "./MovieTile";

export default {
    title: "Movie Tile",
    component: MovieTile,
    tags: ['autodocs'],
    args: {
        movieInfo: {
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
            movieName: "Spider Man",
            releaseYear: 2020,
            genres: ["Action", "Sci-Fi"],
        },
        onSelect: fn(),
    }
}

export const Tile = {
}