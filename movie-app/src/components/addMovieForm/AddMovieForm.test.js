import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";
import '@testing-library/jest-dom';

// Mock useNavigate and useSearchParams
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe("AddMovieForm Component", () => {
  let navigateMock, searchParamsMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    searchParamsMock = {
      toString: jest.fn().mockReturnValue("test=123"),
    };

    useNavigate.mockReturnValue(navigateMock);
    useSearchParams.mockReturnValue([searchParamsMock]);

    // Reset fetch mock before each test
    fetch.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the AddMovieForm component", () => {
    render(<AddMovieForm />);
    expect(screen.getByText("ADD MOVIE")).toBeInTheDocument();
  });

  it("navigates to the previous URL when handleClose is triggered", () => {
    render(<AddMovieForm />);
    const closeButton = screen.getByText("CLOSE"); // Assuming "CLOSE" is the text for the Dialog close button
    fireEvent.click(closeButton);

    expect(navigateMock).toHaveBeenCalledWith("/?test=123");
  });

  it("submits the form successfully and navigates to the movie ID page", async () => {
    // Mock fetch to simulate success response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 42 }),
    });

    render(<AddMovieForm />);

    // Simulate filling out and submitting the form
    const submitButton = screen.getByText("SUBMIT"); // Assuming "SUBMIT" is the text for the submit button in MovieForm
    fireEvent.click(submitButton);

    // Wait for handleSubmit's navigation logic to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith("/42");
    });
  });

  it("handles submission failure gracefully", async () => {
    // Mock fetch to simulate failure response
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<AddMovieForm />);

    // Simulate filling out and submitting the form
    const submitButton = screen.getByText("SUBMIT"); // Assuming "SUBMIT" is the text for the submit button in MovieForm
    fireEvent.click(submitButton);

    // Wait to ensure no navigation occurs in case of an error
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
      expect(navigateMock).not.toHaveBeenCalledWith(expect.stringContaining("/"));
    });
  });

  it("navigates to the home page if response data has no ID", async () => {
    // Mock fetch to simulate success response without ID
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<AddMovieForm />);

    // Simulate filling out and submitting the form
    const submitButton = screen.getByText("SUBMIT"); // Assuming "SUBMIT" is the text for the submit button in MovieForm
    fireEvent.click(submitButton);

    // Wait for handleSubmit's navigation logic to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });
});