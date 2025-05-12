describe('MovieList page E2E testing', () => {
  it("should load movie list", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.visit("http://localhost:3000/");

    cy.get(".movie-tile-container")
      .find(".movie-tile")
      .should("have.length.greaterThan", 0)
  });

  it("should show the correct number of movies", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.visit("http://localhost:3000/");

    cy.get(".movie-tile").then((tiles) => {
      const movieCount = tiles.length;
      cy.get('[data-testid="counter"]').contains(`${movieCount} movies found`);
    })
  });

  it("should allow searching movies", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.intercept("http://localhost:4000/movies?*search=Any*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.visit("http://localhost:3000/");

    cy.get(".search-input").type("Any");
    cy.get(".search-container").contains("SEARCH").click();

    cy.get(".movie-tile").should("have.length", 2);
    cy.contains("Any Movie 1").should("exist");
    cy.contains("Any Movie 2").should("exist");
  });

  it("should allow filtering movies by genre", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.intercept("http://localhost:4000/movies?*filter=COMEDY*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.visit("http://localhost:3000/");

    cy.get(".search-bar").contains("COMEDY").click();

    cy.get(".movie-tile").should("have.length", 2);
    cy.contains("Any Movie 1").should("exist");
    cy.contains("Any Movie 2").should("exist");
  });

  it("should allow sorting movies", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] },
        { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.intercept("http://localhost:4000/movies?*sortBy=release_date*", {
      data: [
        { title: "Any Movie", genres: ["DRAMA", "COMEDY"] },
        { title: "Other Movie", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.visit("http://localhost:3000/");

    cy.get(".sort-by-list").select("release_date");
    cy.get(".sort-by-list").trigger("change");

    cy.get(".movie-tile").first().should("contain", "Any Movie");
    cy.get(".movie-tile").last().should("contain", "Other Movie");
  });

  it("should navigate to the movie details when clicking tile", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { id: 313369, title: "The Movie", genres: ["DRAMA", "COMEDY"] },
      ]
    }).as("getMovies");

    cy.intercept("http://localhost:4000/movies/*", {
      body: {
        id: 313369,
        title: "The Movie",
        poster_path: "https://example.com/mock-poster.jpg",
        vote_average: 8.5,
        genres: ["Drama", "Comedy"],
        release_date: "2022-01-01",
        runtime: "120 min",
        overview: "This is a mock overview of the movie.",
      }
    }).as("getMovieDetails");

    cy.visit("http://localhost:3000/");

    cy.get(".movie-tile").first().click();

    cy.url().should("include", "/313369");
    cy.get(".movie-detail-name").should("contain", "The Movie");
    cy.get(".movie-detail-rating").should("contain", "8.5");
    cy.get(".movie-detail-genres").should("contain", "Drama,Comedy");
    cy.get(".movie-detail-middle").should("contain", "2022-01-01");
    cy.get(".movie-detail-middle").should("contain", "120 min");
    cy.get(".movie-detail img").should("have.attr", "src", "https://example.com/mock-poster.jpg");
    cy.get(".movie-detail p").should("contain", "This is a mock overview of the movie.");
  });
})