import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useSearchParams, useLoaderData } from "react-router-dom";
import EditMovieForm from "./EditMovieForm";
import '@testing-library/jest-dom';

console.log("DOM: " +require.resolve("react-router-dom"));

// Mock external dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useLoaderData: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe("EditMovieForm Component", () => {
  let navigateMock, searchParamsMock, loaderDataMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    searchParamsMock = {
      toString: jest.fn().mockReturnValue("test=123"),
    };
    loaderDataMock = {
      id: 42,
      title: "Test Movie",
      genre: "Action",
      runtime: 120,
    };

    useNavigate.mockReturnValue(navigateMock);
    useSearchParams.mockReturnValue([searchParamsMock]);
    useLoaderData.mockReturnValue(loaderDataMock);

    // Reset fetch mock before each test
    fetch.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the EditMovieForm component with initial movie data", () => {
    render(<EditMovieForm />);
    
    // Assert that the Dialog title is rendered correctly
    expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();

    // Assert that the MovieForm is pre-filled with loader data
    expect(screen.getByDisplayValue(loaderDataMock.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(loaderDataMock.genre)).toBeInTheDocument();
    expect(screen.getByDisplayValue(loaderDataMock.runtime.toString())).toBeInTheDocument();
  });

  it("navigates to the previous URL when handleClose is triggered", () => {
    render(<EditMovieForm />);
    const closeButton = screen.getByText("CLOSE"); // Assuming "CLOSE" is the text for the Dialog close button
    fireEvent.click(closeButton);

    expect(navigateMock).toHaveBeenCalledWith("/?test=123");
  });

  it("submits the form successfully and navigates to the movie ID page with 'refresh=true'", async () => {
    // Mock fetch to simulate success response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 42 }),
    });

    render(<EditMovieForm />);

    // Simulate filling out and submitting the form
    const submitButton = screen.getByText("SUBMIT"); // Assuming "SUBMIT" is the text for the submit button in MovieForm
    fireEvent.click(submitButton);

    // Wait for handleSubmit's navigation logic to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith("/42?test=123&refresh=true");
    });
  });

  it("handles submission failure gracefully", async () => {
    // Mock fetch to simulate failure response
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<EditMovieForm />);

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

    render(<EditMovieForm />);

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