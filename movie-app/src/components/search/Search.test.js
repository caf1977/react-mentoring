import { render, screen, fireEvent } from "@testing-library/react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe("Search component tests", () => {
    let navigateMock, searchParamsMock;

    beforeEach(() => {
        navigateMock = jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn() });
        searchParamsMock = {
            toString: jest.fn().mockReturnValue("test=123"),
        };

        useNavigate.mockReturnValue(navigateMock);
        useSearchParams.mockReturnValue([searchParamsMock]);

        fetch.mockReset();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders initial query", () => {
        render(<Search initialQuery={"default query"} />);
        const query = screen.getByLabelText("FIND YOUR MOVIE");

        expect(query).toHaveValue("default query");
    })

    it("onChange is called when Submit button is clicked", () => {
        window.alert = jest.fn();
        render(<Search onSearch={(value) => { alert(value) }} />);

        const query = screen.getByLabelText("FIND YOUR MOVIE");
        const button = screen.getByText("SEARCH");
        fireEvent.change(query, { target: { value: "Any movie" } });
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith("Any movie");
    })

    it("onChange is called when Enter key is pressed", () => {
        window.alert = jest.fn();
        render(<Search onSearch={(value) => { alert(value) }} />);

        const query = screen.getByLabelText("FIND YOUR MOVIE");
        fireEvent.change(query, { target: { value: "Any movie" } });
        fireEvent.keyDown(query, { key: "Enter", code: "Enter", charCode: 13 });

        expect(window.alert).toHaveBeenCalledWith("Any movie");
    })
})