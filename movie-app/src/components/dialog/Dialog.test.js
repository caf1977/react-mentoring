import {render, screen, fireEvent} from "@testing-library/react";
import Dialog from "./Dialog";

// Mock focus-trap-react to prevent focus-related errors
jest.mock("focus-trap-react", () => ({
    __esModule: true,
    default: ({ children }) => <>{children}</>, // Simple passthrough
}));

describe("Custom Dialog component tests", () => {
    it("renders dialog", () => {
        render(
            <Dialog title="Test Dialog" onClose={jest.fn()}>
                <p>This is a test dialog</p>
            </Dialog>
        );
        const title = screen.getByText("Test Dialog");
        
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(screen.getByText("This is a test dialog")).toBeInTheDocument();
    })

    it("onClose is called when the close button is clicked", () => {
        const onClose = jest.fn();

        render(
            <Dialog title="Test Dialog" onClose={onClose}>
                <p>This is a test dialog</p>
            </Dialog>
        );
        fireEvent.click(screen.getByTestId("close-button"));

        expect(onClose).toHaveBeenCalledTimes(1);
    })
})



