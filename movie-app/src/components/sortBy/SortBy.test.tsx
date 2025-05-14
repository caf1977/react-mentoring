import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import SortBy from './SortBy';

describe("SortBy component tests", () => {
    it("renders sortBy dropdown with options", () => {
        render(<SortBy />);
        const dropdown = screen.getByLabelText("SORT BY:");

        expect(dropdown).toBeInTheDocument();
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent(/release date/i);
        expect(options[1]).toHaveTextContent(/title/i);
    })

    it("release date as current selection", () => {
        render(<SortBy currentSelection={"release_date"}/>);
        const dropdown = screen.getByLabelText("SORT BY:");

        expect(dropdown).toBeInTheDocument();
        const options = screen.getAllByRole("option") as HTMLOptionElement[];
        expect(options).toHaveLength(2);
        expect(options[0].selected).toBe(true);
        expect(options[1].selected).toBe(false);
    })

    it("title as current selection", () => {
        render(<SortBy currentSelection={"title"}/>);
        const dropdown = screen.getByLabelText("SORT BY:");

        expect(dropdown).toBeInTheDocument();
        const options = screen.getAllByRole("option") as HTMLOptionElement[];
        expect(options).toHaveLength(2);
        expect(options[0].selected).toBe(false);
        expect(options[1].selected).toBe(true);
    })

    it("onChange is called when option is selected", () => {
        window.alert = jest.fn();
        render(<SortBy onSelectionChange={(value) => {alert(value)}}/>);
        const dropdown = screen.getByLabelText("SORT BY:");
        fireEvent.click(dropdown);
        fireEvent.change(dropdown, { target: {value: "title"}});

        expect(window.alert).toHaveBeenCalledWith("title");
    })

    it("renders snapshot", () => {
        const { asFragment } = render(<SortBy currentSelection={"release_date"}/>);

        expect(asFragment()).toMatchSnapshot();
    })
})