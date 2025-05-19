import React, { ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useSearchParams, useLoaderData } from "react-router-dom";
import EditMovieForm from "./EditMovieForm";
import '@testing-library/jest-dom';

interface LoaderData {
  id: number;
  title: string;
  runtime: number;
}

// Mock focus-trap-react to prevent focus-related errors
jest.mock("focus-trap-react", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useLoaderData: jest.fn(),
}));

describe("EditMovieForm Component tests", () => {
  let navigateMock: jest.Mock, searchParamsMock, loaderDataMock: LoaderData;

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
    searchParamsMock = {
      toString: jest.fn().mockReturnValue("test=123"),
    };
    
    loaderDataMock = {
      id: 42,
      title: "Test Movie",
      runtime: 120,
    };

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useSearchParams as jest.Mock).mockReturnValue([searchParamsMock]);
    (useLoaderData as jest.Mock).mockReturnValue(loaderDataMock);
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
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 42 }),
      status: 201, 
    });

    render(<EditMovieForm />);

    const submitButton = screen.getByText("SUBMIT");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/movies", expect.any(Object));
    });
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/42?test=123&refresh=true");
    });
  });
});