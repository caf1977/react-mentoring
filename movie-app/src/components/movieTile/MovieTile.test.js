import {render, screen, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MovieTile from "./MovieTile";

describe("MovieTile component tests", () => {

    const movie = {
        poster_path: "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        title: "Mission Impossible",
        release_date: 2018,
        genres: ["Drama", "Thriller"],
    };

    it("renders movie tile info", () => {
        render(
            <MemoryRouter> {/* Wrap the component with a router */}
                <MovieTile movieInfo={movie}/>
            </MemoryRouter>
        );
        
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
        render(
            <MemoryRouter> {/* Wrap the component with a router */}
                <MovieTile movieInfo={movie} onClick={(value) => {alert(value)}}/>
            </MemoryRouter>
        );

        const tile = screen.getByTestId("info");
        fireEvent.click(tile);

        expect(window.alert).toHaveBeenCalledWith(movie);
    })

    it("renders snapshot", () => {
        const { asFragment } = render(
            <MemoryRouter> {/* Wrap the component with a router */}
                <MovieTile movieInfo={movie}/>
            </MemoryRouter>
            );

        expect(asFragment(<MovieTile movieInfo={movie}/>)).toMatchSnapshot();
    })
})