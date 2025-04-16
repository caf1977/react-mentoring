import MovieDetail from "./MovieDetail";

export default {
    title: "Movie Details",
    component: MovieDetail,
    tags: ['autodocs'],
    args: {
        movieInfo: {
            poster_path: "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
            title: "Star Wars",
            release_date: 2000,
            vote_average: "7.5",
            runtime: "110 minutes",
            overview: "Rey develops her abilities with the help of Luke Skywalker as the Resistance prepares for battle against the First Order",
            genres: ["Sci-Fi", "Action"],
        }
    }
}

export const Details = {
}