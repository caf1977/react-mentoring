import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { fn } from '@storybook/test';
import Search from "./Search";
import { StoryFn } from '@storybook/react/*';

export default {
    title: "Search Form",
    component: Search,
    tags: ['autodocs'],
    args: { 
        onSearch: fn(),
    },
    decorators: [
        (Story: StoryFn) => (
            // Wrap the component in a Router context
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export const EmptyQuery = {
};

export const DefaultQuery = {
    args: {
        initialQuery: "default query",
    }
};
