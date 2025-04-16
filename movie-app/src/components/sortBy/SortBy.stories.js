import { fn } from '@storybook/test';
import SortBy from "./SortBy";

export default {
    title: "Sort By",
    component: SortBy,
    tags: ['autodocs'],
    args: {
        onSelectionChange: fn(),
    }
}

export const ReleaseDate = {
    args: {
        currentSelection: "release_date",
    }
}

export const Title = {
    args: {
        currentSelection: "title",
    }
}