describe("things", () => {
  it("makes a thing", () => {
    cy.visit("/");
    cy.findByText(/It is 08:00 AM/i);
    cy.findByText("Wear clean pants").click();
    cy.findByText("Wear clean shirt").click();
    cy.findByText("Wear clean sock").click();
    cy.findByText("Wear clean underpants").click();
    cy.findByText("Go to work").click();
    cy.findByText("Play a game");
  });
});
