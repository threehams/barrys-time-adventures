import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";

describe("new game", () => {
  it("starts up without issues", () => {
    cy.wrap(null).then(async () => {
      const VERSION = 1;
      const databaseName = "reconciliation_game";
      const savedGameKey = "saved_game";
      localForage.config({
        version: VERSION,
        name: databaseName,
        storeName: databaseName,
      });
      await localForage.setItem(
        savedGameKey,
        produce(initialState, (draft) => {
          draft.unlocks.autoPurchase = true;
        }),
      );
    });
    cy.visit("/");
  });
});
