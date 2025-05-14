import { fn } from '@storybook/test';
import Genre from "./Genre";

export default {
    title: "Genre Select",
    component: Genre,
    tags: ['autodocs'],
    args: {
        initialGenres: ["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"],
        onSelect: fn(),
    }
};

export const List = {
}

export const ActionSelected = {
    args: {
        selectedGenre: "Action",
    }
};

export const ComedySelected = {
    args: {
        selectedGenre: "Comedy",
    }
};

export const DramaSelected = {
    args: {
        selectedGenre: "Drama",
    }
};

export const ThrillerSelected = {
    args: {
        selectedGenre: "Thriller",
    }
};

export const SciFiSelected = {
    args: {
        selectedGenre: "Sci-Fi",
    }
};