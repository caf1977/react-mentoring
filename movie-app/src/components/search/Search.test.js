import {render, screen, fireEvent} from "@testing-library/react"
import { MemoryRouter } from "react-router";
import Search from "./Search";

describe("Search component tests", () => {
    it("renders initial query", () => {
        render(
            <MemoryRouter> {/* Wrap the component with a router */}
                <Search initialQuery={"default query"} />
            </MemoryRouter>
        );
        const query = screen.getByLabelText("FIND YOUR MOVIE");
        
        expect(query).toHaveValue("default query");
    })

    it("onChange is called when Submit button is clicked", () => {
        window.alert = jest.fn();
        render(
            <MemoryRouter> {/* Wrap the component with a router */}
                <Search onSearch={(value) => {alert(value)}}/>
            </MemoryRouter>
        );
        
        const query = screen.getByLabelText("FIND YOUR MOVIE");
        const button = screen.getByText("SEARCH");
        fireEvent.change(query, { target: { value: "Any movie" } });
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith("Any movie");
    })

    it("onChange is called when Enter key is pressed", () => {
        window.alert = jest.fn();
        render(
            <MemoryRouter> {/* Wrap the component with a router */}
                <Search onSearch={(value) => {alert(value)}}/>
            </MemoryRouter>
        );
        
        const query = screen.getByLabelText("FIND YOUR MOVIE");
        fireEvent.change(query, { target: { value: "Any movie" } });
        fireEvent.keyDown(query, {key: "Enter", code: "Enter", charCode: 13});

        expect(window.alert).toHaveBeenCalledWith("Any movie");
    })
})