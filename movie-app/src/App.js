import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieListPage from './components/movieListPage/MovieListPage';
import SearchWrapper from './components/search/SearchWrapper';
import MovieDetailWrapper from './components/movieDetail/MovieDetailWrapper';
import AddMovieForm from './components/addMovieForm/AddMovieForm';

const fetchMovieDetails = async ({ params }) => {
  const { movieId } = params;

  const response = await fetch(`http://localhost:4000/movies/${movieId}`);
  if (!response.ok) {
      throw new Error("Failed to fetch movie details");
  }
  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
    children: [
      {
        path: "/",
        element: <SearchWrapper />,
        children: [
          {
            path: "new",
            element: <AddMovieForm />
          }
        ]
      },
      {
        path: ":movieId",
        element: <MovieDetailWrapper />,
        loader: fetchMovieDetails
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
