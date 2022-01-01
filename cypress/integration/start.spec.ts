export {};

describe("new game", () => {
  it("completes the first day", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /Closet/i }).click();
    cy.findByRole("button", { name: /Wear jeans/i }).click();
    cy.findByRole("button", { name: /Wear t-shirt/i }).click();
    cy.findByRole("button", { name: /Wear socks/i }).click();
    cy.findByRole("button", { name: /Wear briefs/i }).click();
    cy.findByText("Go to work").should("not.be.disabled").click();
    cy.findByText("Play a game").click();
    cy.findByText("Go to sleep").click();
    cy.findByText("Go to work");
  });
});
