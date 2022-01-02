export {};

describe("new game", () => {
  it("starts up without issues", () => {
    cy.visit("/");
    cy.findByText("You have 0 things.");
  });
});
