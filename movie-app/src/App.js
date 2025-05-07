import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieListPage from './components/movieListPage/MovieListPage';
import SearchWrapper from './components/search/SearchWrapper';
import MovieDetailWrapper from './components/movieDetail/MovieDetailWrapper';
import AddMovieForm from './components/addMovieForm/AddMovieForm';
import EditMovieForm from './components/editMovieForm/EditMovieForm';

const fetchMovieDetails = async ({ params }) => {
  const { movieId } = params;
  console.log("Loader fetchMovieDetails triggered for movieId:", params.movieId);

  try {
    const response = await fetch(`http://localhost:4000/movies/${movieId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch movie details", error);
  }
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
        loader: fetchMovieDetails,
        children: [
          {
            path: "edit",
            element: <EditMovieForm />,
            loader: fetchMovieDetails,
          }
        ]
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
