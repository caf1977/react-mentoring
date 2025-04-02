import {render, screen} from "@testing-library/react";
import MovieDetail from "./MovieDetail";

describe("MovieDetail component tests", () => {

    const movie = {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
        movieName: "Spider Man",
        releaseYear: 2020,
        rating: "PG",
        duration: "120 minutes",
        description: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War.",
    };

    it("renders movie detail info", () => {
        render(<MovieDetail movieInfo={movie}/>);
        const image = screen.getByAltText("Spider Man");
        const name = screen.getByText("Spider Man");
        const releaseYear = screen.getByText("2020");
        const rating = screen.getByText("PG");
        const duration = screen.getByText("120 minutes");
        const description = screen.getByText("Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War.");
        
        expect(image.src).toContain("https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg");
        expect(name).toBeInTheDocument();
        expect(releaseYear).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
        expect(duration).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    })

    it("renders snapshot", () => {
        const { asFragment } = render(<MovieDetail movieInfo={movie}/>);

        expect(asFragment(<MovieDetail movieInfo={movie}/>)).toMatchSnapshot();
    })
})