import { fn } from '@storybook/test';
import Search from "./Search";

export default {
    title: "Search Form",
    component: Search,
    tags: ['autodocs'],
    args: { 
        onSearch: fn(),
    },
};

export const EmptyQuery = {
};

export const DefaultQuery = {
    args: {
        initialQuery: "default query",
    }
};
