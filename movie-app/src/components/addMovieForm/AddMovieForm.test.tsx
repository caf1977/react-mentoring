import React, { ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";
import '@testing-library/jest-dom';

// Mock focus-trap-react to prevent focus-related errors
jest.mock("focus-trap-react", () => ({
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe("AddMovieForm Component tests", () => {
    let navigateMock: jest.Mock;

    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn(),
            ok: true,
            status: 200,
            statusText: "OK",
            text: jest.fn(),
            headers: {
                get: jest.fn(),
            },
        });

        navigateMock = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams("?test=123")]);
    });

    it("renders the AddMovieForm component", () => {
        render(<AddMovieForm />);

        expect(screen.getByText("ADD MOVIE")).toBeInTheDocument();
        expect(screen.getByTestId("movie-form")).toBeInTheDocument();
    });

    it("navigates to the root URL when handleClose is triggered", () => {
        render(<AddMovieForm />);

        const closeButton = screen.getByTestId("close-button");
        fireEvent.click(closeButton);

        expect(navigateMock).toHaveBeenCalledWith("/?test=123");
    });

    it("submits the form successfully and navigates to the movie ID page", async () => {
        // Mock fetch to simulate success response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({ id: 42 }),
            status: 201,
        });

        render(<AddMovieForm />);

        // Simulate filling out and submitting the form
        const submitButton = screen.getByText("SUBMIT");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
        });
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith("/42");
        });
    });
});