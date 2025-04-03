import MovieDetail from "./MovieDetail";

export default {
    title: "Movie Details",
    component: MovieDetail,
    tags: ['autodocs'],
    args: {
        movieInfo: {
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
            movieName: "Star Wars",
            releaseYear: 2000,
            rating: "7.5",
            duration: "110 minutes",
            description: "Rey develops her abilities with the help of Luke Skywalker as the Resistance prepares for battle against the First Order",
            genres: ["Sci-Fi", "Action"],
        }
    }
}

export const Details = {
}