import {render, screen, fireEvent} from "@testing-library/react"
import  Genre from '../components/genre/Genre'

describe("Genre component tests", () => {
    it("renders all genres", () => {
        render(<Genre initialGenres={["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"]} />);
        const actionButton = screen.getByText("Action");
        const comedyButton = screen.getByText("Comedy");
        const dramaButton = screen.getByText("Drama");
        const thrillerButton = screen.getByText("Thriller");
        const scifiButton = screen.getByText("Sci-Fi");

        expect(actionButton).toBeInTheDocument();
        expect(comedyButton).toBeInTheDocument();
        expect(dramaButton).toBeInTheDocument();
        expect(thrillerButton).toBeInTheDocument();
        expect(scifiButton).toBeInTheDocument();
    })

    it("selected genre is highlighted", () => {
        render(<Genre initialGenres={["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"]}
                      selectedGenre="Thriller"
                />);
        const actionButton = screen.getByText("Action");
        const comedyButton = screen.getByText("Comedy");
        const dramaButton = screen.getByText("Drama");
        const thrillerButton = screen.getByText("Thriller");
        const scifiButton = screen.getByText("Sci-Fi");
        
        expect(actionButton).toHaveClass("genre-button");
        expect(comedyButton).toHaveClass("genre-button");
        expect(dramaButton).toHaveClass("genre-button");
        expect(thrillerButton).toHaveClass("genre-button selected");
        expect(scifiButton).toHaveClass("genre-button");
    })

    it("onClick is called when button is clicked", () => {
        window.alert = jest.fn();
        render(<Genre initialGenres={["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"]}
                      selectedGenre="Thriller"
                      onSelect={(value) => {alert(value)}}
                />);
        const comedyButton = screen.getByText("Comedy");
        fireEvent.click(comedyButton);

        expect(window.alert).toHaveBeenCalledWith("Comedy");
    })    
})
