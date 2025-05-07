import {render, screen, fireEvent, act } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("Movie Form component tests", () => {

    const genreOptions = ["Crime", "Documentary", "Horror", "Comedy"];
    
    const initialMovie = {
        title: "Star Wars",
        release_date: "2008-05-12",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
        vote_average: 5.5,
        genres: ["Horror", "Comedy"],
        runtime: 120,
        genreListOpen: true,
        overview: "Peter Parker returns home to live with his Aunt May and mentor Tony Stark after his debut as Spider-Man in Captain America: Civil War."
    };

    it("renders add movie form empty", () => {
        render(<MovieForm />);
        const title = screen.getByLabelText("TITLE");
        const release_date = screen.getByLabelText("RELEASE DATE");
        const poster_path = screen.getByLabelText("MOVIE URL");
        const vote_average = screen.getByLabelText("RATING");
        const runtime = screen.getByLabelText("RUNTIME");
        const overview = screen.getByLabelText("OVERVIEW");

        const genreButton = screen.getByText("Select Genre");
        fireEvent.click(genreButton);

        expect(title).toHaveValue("");
        expect(release_date).not.toHaveValue();
        expect(poster_path).toHaveValue("");
        expect(vote_average).not.toHaveValue();
        expect(runtime).not.toHaveValue();
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
        const release_date = screen.getByLabelText("RELEASE DATE");
        const poster_path = screen.getByLabelText("MOVIE URL");
        const vote_average = screen.getByLabelText("RATING");
        const runtime = screen.getByLabelText("RUNTIME");
        const overview = screen.getByLabelText("OVERVIEW");

        const genreButton = screen.getByText("Select Genre");
        fireEvent.click(genreButton);

        expect(title).toHaveValue("Star Wars");
        expect(release_date).toHaveValue("2008-05-12");
        expect(poster_path).toHaveValue("https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg");
        expect(vote_average).toHaveValue(5.5);
        expect(runtime).toHaveValue(120);
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

    it("onSubmit is called when the submit button is clicked", async () => {
        const onSubmit = jest.fn();

        render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmit} />);

        await act(async () => {
            fireEvent.click(screen.getByText("SUBMIT"));
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
    })

    it("onSubmit is not called and form is cleared when the reset button is clicked", async () => {
        const onSubmit = jest.fn();

        render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmit} />);

        await act(async () => {
            fireEvent.click(screen.getByText("RESET"));
        });

        expect(onSubmit).not.toHaveBeenCalled();
    })
})