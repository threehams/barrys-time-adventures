import localForage from "localforage";

beforeEach(() => {
  cy.visit("/");
  cy.clearLocalStorage();
  cy.wrap(null).then(() => {
    const VERSION = 1;
    const databaseName = "laundry_game";
    const savedGameKey = "saved_game";
    localForage.config({
      version: VERSION,
      name: databaseName,
      storeName: databaseName,
    });
    return localForage.removeItem(savedGameKey);
  });
});
