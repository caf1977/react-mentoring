import {render, screen, fireEvent} from "@testing-library/react"
import Counter from "../components/counter/Counter";

describe("Counter component tests", () => {
    it("renders initial value", () => {
        render(<Counter initialValue={15} />);
        const value = screen.getByText(/value: 15/i);
        
        expect(value).toBeInTheDocument();
    })

    it("decrements value when button is clicked", () => {
        render(<Counter initialValue={5} />);
        const button = screen.getByText("Decrement");
        fireEvent.click(button);
        const value = screen.getByText(/value: 4/i);
        
        expect(value).toBeInTheDocument();
    })

    it("increments value when button is clicked", () => {
        render(<Counter initialValue={9} />);
        const button = screen.getByText("Increment");
        fireEvent.click(button);
        const value = screen.getByText(/value: 10/i);
        
        expect(value).toBeInTheDocument();
    })

})