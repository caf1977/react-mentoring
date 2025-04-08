import {render, screen, fireEvent} from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("Movie Form component tests", () => {

    const genreOptions = ["Crime", "Documentary", "Horror", "Comedy"];

    const initialMovie = {
        title: "Star Wars",
        releaseDate: "2008-05-12",
        movieUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
        rating: "5.5",
        genres: ["Horror", "Comedy"],
        runtime: "120 minutes",
        genreListOpen: true,
        overview: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War."
    };

    it("renders add movie form empty", () => {
        render(<MovieForm />);
        const title = screen.getByLabelText("TITLE");
        const releaseDate = screen.getByLabelText("RELEASE DATE");
        const movieUrl = screen.getByLabelText("MOVIE URL");
        const rating = screen.getByLabelText("RATING");
        const runtime = screen.getByLabelText("RUNTIME");
        const overview = screen.getByLabelText("OVERVIEW");

        const genreButton = screen.getByText("Select Genre");
        fireEvent.click(genreButton);

        expect(title).toHaveValue("");
        expect(releaseDate).toHaveValue("");
        expect(movieUrl).toHaveValue("");
        expect(rating).toHaveValue("");
        expect(runtime).toHaveValue("");
        expect(overview).toHaveValue("");
        
        genreOptions.forEach((genre) => {
            const checkbox = screen.getByLabelText(genre);
            expect(checkbox).toBeInTheDocument();
            expect(checkbox).toHaveAttribute("type", "checkbox");
          });
    })

    it("renders edit movie form with data", () => {
        render(<MovieForm initialMovie={initialMovie} />);
        const title = screen.getByLabelText("TITLE");
        const releaseDate = screen.getByLabelText("RELEASE DATE");
        const movieUrl = screen.getByLabelText("MOVIE URL");
        const rating = screen.getByLabelText("RATING");
        const runtime = screen.getByLabelText("RUNTIME");
        const overview = screen.getByLabelText("OVERVIEW");

        const genreButton = screen.getByText("Select Genre");
        fireEvent.click(genreButton);

        expect(title).toHaveValue("Star Wars");
        expect(releaseDate).toHaveValue("2008-05-12");
        expect(movieUrl).toHaveValue("https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg");
        expect(rating).toHaveValue("5.5");
        expect(runtime).toHaveValue("120 minutes");
        expect(overview).toHaveValue("Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War.");

        const crimeCheckbox = screen.getByLabelText("Crime");
        const documentaryCheckbox = screen.getByLabelText("Documentary");
        const horrorCheckbox = screen.getByLabelText("Horror");
        const comedyCheckbox = screen.getByLabelText("Comedy");

        expect(crimeCheckbox).not.toBeChecked();
        expect(documentaryCheckbox).not.toBeChecked();
        expect(horrorCheckbox).toBeChecked();
        expect(comedyCheckbox).toBeChecked();
    })

    it("onSubmit is called when the submit button is clicked", () => {
        const onSubmit = jest.fn();

        render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmit} />);
        fireEvent.click(screen.getByText("SUBMIT"));
        fireEvent.submit(screen.getByTestId("movie-form"));

        expect(onSubmit).toHaveBeenCalledTimes(1);
    })

    it("onSubmit is not called and form is cleared when the reset button is clicked", () => {
        const onSubmit = jest.fn();

        render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmit} />);
        const title = screen.getByLabelText("TITLE");
        const releaseDate = screen.getByLabelText("RELEASE DATE");
        const movieUrl = screen.getByLabelText("MOVIE URL");
        const rating = screen.getByLabelText("RATING");
        const runtime = screen.getByLabelText("RUNTIME");
        const overview = screen.getByLabelText("OVERVIEW");

        fireEvent.click(screen.getByText("RESET"));
        fireEvent.submit(screen.getByTestId("movie-form"));

        const genreButton = screen.getByText("Select Genre");
        fireEvent.click(genreButton);

        expect(title).toHaveValue("");
        expect(releaseDate).toHaveValue("");
        expect(movieUrl).toHaveValue("");
        expect(rating).toHaveValue("");
        expect(runtime).toHaveValue("");
        expect(overview).toHaveValue("");
        expect(onSubmit).toHaveBeenCalledTimes(0);

        genreOptions.forEach((genre) => {
            const checkbox = screen.getByLabelText(genre);
            expect(checkbox).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
          });
    })
})