export {};

beforeEach(() => {
  cy.visit("/");
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.indexedDB.deleteDatabase("laundry_game");
  });
});
