describe('MovieList page E2E testing', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should load movie list", () => {    
    cy.intercept("http://localhost:4000/movies*");

    cy.get(".movie-tile-container")
      .find(".movie-tile")
      .should("have.length.greaterThan", 0)
  });

  it("should show the correct number of movies", () => {
    cy.get(".movie-tile").then((tiles) => {
      const movieCount = tiles.length;
      cy.get('[data-testid="counter"]').contains(`${movieCount} movies found`);
    })
  });

  it("should allow searching movies", () => {
    cy.intercept("http://localhost:4000/movies?*search=Any*", {
      data: [
            { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] }, 
            { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
        ],
    });

    cy.get(".search-input").type("Any");
    cy.get(".search-container").contains("SEARCH").click();

    cy.get(".movie-tile").should("have.length", 2);
    cy.contains("Any Movie 1").should("exist");
    cy.contains("Any Movie 2").should("exist");
  });

  it("should allow filtering movies by genre", () => {
    cy.intercept("http://localhost:4000/movies?*filter=COMEDY*", {
      data: [
            { title: "Any Movie 1", genres: ["DRAMA", "COMEDY"] }, 
            { title: "Any Movie 2", genres: ["DRAMA", "COMEDY"] }
        ],
    });

    cy.get(".search-bar").contains("COMEDY").click();

    cy.get(".movie-tile").should("have.length", 2);
    cy.contains("Any Movie 1").should("exist");
    cy.contains("Any Movie 2").should("exist");
  });

  it("should allow sorting movies", () => {
    cy.intercept("http://localhost:4000/movies?*sortBy=title*", {
      data: [
            { title: "Any Movie", genres: ["DRAMA", "COMEDY"] }, 
            { title: "Other Movie", genres: ["DRAMA", "COMEDY"] }
      ],
    });

    cy.get(".search-bar select").select("title")

    cy.get(".movie-tile").first().should("contain", "Any Movie");
    cy.get(".movie-tile").last().should("contain", "Other Movie");
  });

  it("should navigate to the movie details when clicking tile", () => {
    cy.intercept("http://localhost:4000/movies*", {
      data: [
        { id: 313369, title: "The Movie", genres: ["DRAMA", "COMEDY"] },
      ]
    });

    cy.get(".movie-tile").first().click();

    cy.url().should("include", "/313369");
  });
})