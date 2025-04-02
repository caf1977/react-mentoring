import {fireEvent, render, screen} from "@testing-library/react";
import SortBy from "./SortBy";

describe("SortBy component tests", () => {
    it("renders sortBy dropdown with options", () => {
        render(<SortBy />);
        const dropdown = screen.getByLabelText("SORT BY:");

        expect(dropdown).toBeInTheDocument();
        expect(dropdown.children[0].textContent).toBe("RELEASE DATE");
        expect(dropdown.children[1].textContent).toBe("TITLE");
    })

    it("release date as current selection", () => {
        render(<SortBy currentSelection={"Release Date"}/>);
        const dropdown = screen.getByLabelText("SORT BY:");

        expect(dropdown).toBeInTheDocument();
        expect(dropdown.children[0].selected).toBe(true);
        expect(dropdown.children[1].selected).toBe(false);
    })

    it("title as current selection", () => {
        render(<SortBy currentSelection={"Title"}/>);
        const dropdown = screen.getByLabelText("SORT BY:");

        expect(dropdown).toBeInTheDocument();
        expect(dropdown.children[0].selected).toBe(false);
        expect(dropdown.children[1].selected).toBe(true);
    })

    it("onChange is called when option is selected", () => {
        window.alert = jest.fn();
        render(<SortBy onSelectionChange={(value) => {alert(value)}}/>);
        const dropdown = screen.getByLabelText("SORT BY:");
        fireEvent.click(dropdown);
        fireEvent.change(dropdown, { target: {value: "Title"}});

        expect(window.alert).toHaveBeenCalledWith("Title");
    })

    it("renders snapshot", () => {
        const { asFragment } = render(<SortBy currentSelection={"Release Date"}/>);

        expect(asFragment(<SortBy currentSelection={"Release Date"}/>)).toMatchSnapshot();
    })
})