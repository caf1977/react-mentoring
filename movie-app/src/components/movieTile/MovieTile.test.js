import {render, screen, fireEvent} from "@testing-library/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieTile from "./MovieTile";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe("MovieTile component tests", () => {
    let navigateMock, searchParamsMock;

    beforeEach(() => {
        fetch = jest.fn();
        navigateMock = jest.fn();
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

    const movie = {
        poster_path: "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        title: "Mission Impossible",
        release_date: 2018,
        genres: ["Drama", "Thriller"],
    };

    it("renders movie tile info", () => {
        render(<MovieTile movieInfo={movie}/>);
        
        const image = screen.getByAltText("Mission Impossible");
        const name = screen.getByText("Mission Impossible");
        const releaseYear = screen.getByText("2018");
        const genres = screen.getByText("Drama,Thriller");
        
        expect(image.src).toContain("https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg");
        expect(name).toBeInTheDocument();
        expect(releaseYear).toBeInTheDocument();
        expect(genres).toBeInTheDocument();
    })

    it("onClick is called when image is clicked", () => {
        window.alert = jest.fn();
        render(<MovieTile movieInfo={movie} onClick={(value) => {alert(value)}}/>);

        const tile = screen.getByTestId("info");
        fireEvent.click(tile);

        expect(window.alert).toHaveBeenCalledWith(movie);
    })

    it("renders snapshot", () => {
        const { asFragment } = render(<MovieTile movieInfo={movie}/>);

        expect(asFragment(<MovieTile movieInfo={movie}/>)).toMatchSnapshot();
    })
})