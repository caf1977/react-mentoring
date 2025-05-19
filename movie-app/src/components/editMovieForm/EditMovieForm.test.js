import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useSearchParams, useLoaderData } from "react-router-dom";
import EditMovieForm from "./EditMovieForm";
import '@testing-library/jest-dom';

// Mock focus-trap-react to prevent focus-related errors
jest.mock("focus-trap-react", () => ({
    __esModule: true,
    default: ({ children }) => <>{children}</>, // Simple passthrough
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useLoaderData: jest.fn(),
}));

describe("EditMovieForm Component tests", () => {
  let navigateMock, searchParamsMock, loaderDataMock;

  beforeEach(() => {
    fetch = jest.fn();
    navigateMock = jest.fn();
    searchParamsMock = {
      toString: jest.fn().mockReturnValue("test=123"),
    };
    loaderDataMock = {
      id: 42,
      title: "Test Movie",
      runtime: 120,
    };

    useNavigate.mockReturnValue(navigateMock);
    useSearchParams.mockReturnValue([searchParamsMock]);
    useLoaderData.mockReturnValue(loaderDataMock);

    fetch.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the EditMovieForm component with initial movie data", () => {
    render(<EditMovieForm />);
    
    expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument();
    expect(screen.getByDisplayValue(loaderDataMock.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(loaderDataMock.runtime.toString())).toBeInTheDocument();
  });

  it("navigates to the previous URL when handleClose is triggered", () => {
    render(<EditMovieForm />);

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(navigateMock).toHaveBeenCalledWith("/?test=123");
  });

  it("submits the form successfully and navigates to the movie ID page", async () => {
    // Mock fetch to simulate success response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 42 }),
    });

    render(<EditMovieForm />);

    const submitButton = screen.getByText("SUBMIT");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith("/42?test=123&refresh=true");
    });
  });
});