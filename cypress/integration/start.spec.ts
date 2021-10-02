import localForage from "localforage";
import { initialState, State } from "@laundry/store";

const VERSION = 1;
const databaseName = "laundry_game";
const savedGameKey = "saved_game";

describe("new game", () => {
  it("completes a single day", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /Closet/i }).click();
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
    loadSave({
      ...initialState,
      stats: {
        ...initialState.stats,
        money: 160,
      },
      time: 86_400_000 * 5,
    });
    cy.visit("/");
    cy.findByRole("button", { name: /Upgrades/i }).click();
    cy.findByRole("button", { name: /Buy more clothes/i }).click();
    cy.findByRole("button", { name: /Shop/i }).click();
    cy.findByRole("button", { name: "Buy Dress ($40)" }).click();

    cy.findByText(/You have \$120/);

    cy.findByRole("button", { name: /Closet/i }).click();
    cy.findByRole("button", { name: /Wear clean dress/i }).click();

    cy.findAllByText(/Wearing: Clean Dress/);
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
