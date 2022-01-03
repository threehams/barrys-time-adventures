export {};

describe("new game", () => {
  it("starts up without issues", () => {
    cy.visit("/");
    cy.findByText("Rations: 0");
  });
});
