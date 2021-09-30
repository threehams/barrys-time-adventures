import localForage from "localforage";
import { initialState, State } from "@laundry/store";

const VERSION = 1;
const databaseName = "laundry_game";
const savedGameKey = "saved_game";

describe("new game", () => {
  it("completes a single day", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /Wear clean jeans/i }).click();
    cy.findByRole("button", { name: /Wear clean t-shirt/i }).click();
    cy.findByRole("button", { name: /Wear clean socks/i }).click();
    cy.findByRole("button", { name: /Wear clean briefs/i }).click();
    cy.findByText("Go to work").should("not.be.disabled").click();
    cy.findByText("Play a game").click();
    cy.findByText("Go to sleep").click();
    cy.findByText("Go to work");
  });

  it("buys an upgrade", () => {
    loadSave(initialState);
  });
});

const loadSave = (data: State) => {
  cy.window().then(() => {
    localForage.config({
      version: VERSION,
      name: databaseName,
      storeName: databaseName,
    });
    localForage.setItem(savedGameKey, data);
  });
};
