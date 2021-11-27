import localForage from "localforage";
import { initialState, State } from "@laundry/store";
import { hoursToMilliseconds } from "date-fns";

const savedGameKey = "saved_game";

describe("upgrades", () => {
  it.only("unlocks the shop", () => {
    cy.loadSave({
      ...initialState,
      stats: {
        ...initialState.stats,
        money: 160,
      },
      time: hoursToMilliseconds(24 * 5),
    });
    cy.visit("/");
    cy.findByRole("button", { name: /Upgrades/i }).click();
    cy.findByRole("button", { name: /Buy more clothes/i }).click();
    cy.findByRole("button", { name: /Shop/i }).click();
    cy.findByRole("button", { name: /Buy Dress/i }).click();

    cy.findByText(/You have \$120/);

    cy.findByRole("button", { name: /Closet/i }).click();
    cy.findByRole("button", { name: /Wear dress/i }).click();

    cy.findAllByText(/Wearing: Clean Dress/);
  });

  it("unlocks clothing sets", () => {
    cy.loadSave({
      ...initialState,
      stats: {
        ...initialState.stats,
        money: 160,
      },
      upgrades: {
        buyClothes: 1,
      },
      time: hoursToMilliseconds(24 * 5),
    });
    cy.visit("/");
    cy.findByRole("button", { name: /Shop/i }).click();
    cy.findByRole("button", { name: /Buy Dress/i }).click();

    cy.findByText(/You have \$120/);

    cy.findByRole("button", { name: /Closet/i }).click();
    cy.findByRole("button", { name: /Wear dress/i }).click();

    cy.findAllByText(/Wearing: Clean Dress/);
  });
});
