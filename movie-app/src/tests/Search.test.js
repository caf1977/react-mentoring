import {render, screen, fireEvent} from "@testing-library/react"
import Search from "../components/search/Search";

describe("Search component tests", () => {
    it("renders initial query", () => {
        render(<Search initialQuery={"default query"} />);
        const query = screen.getByLabelText("FIND YOUR MOVIE");
        
        expect(query).toHaveValue("default query");
    })

    it("onChange is called when Submit button is clicked", () => {
        window.alert = jest.fn();
        render(<Search onSearch={(value) => {alert(value)}}/>);
        const query = screen.getByLabelText("FIND YOUR MOVIE");
        const button = screen.getByText("SEARCH");
        fireEvent.change(query, { target: { value: "Any movie" } });
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith("Any movie");
    })

    it("onChange is called when Enter key is pressed", () => {
        window.alert = jest.fn();
        render(<Search onSearch={(value) => {alert(value)}}/>);
        const query = screen.getByLabelText("FIND YOUR MOVIE");
        fireEvent.change(query, { target: { value: "Any movie" } });
        fireEvent.keyDown(query, {key: "Enter", code: "Enter", charCode: 13});

        expect(window.alert).toHaveBeenCalledWith("Any movie");
    })
})