import localForage from "localforage";

describe("exploration", () => {
  it("completes the first three explorations", () => {
    cy.fixture("timedUpgrades").then(async (data) => {
      const VERSION = 1;
      const databaseName = "reconciliation_game";
      const savedGameKey = "saved_game";
      localForage.config({
        version: VERSION,
        name: databaseName,
        storeName: databaseName,
      });
      await localForage.setItem(savedGameKey, data);
    });
    cy.visit("/");
  });
});
