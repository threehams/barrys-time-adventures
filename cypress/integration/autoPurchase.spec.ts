import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";

describe("new game", () => {
  it("starts up without issues", () => {
    cy.wrap(null).then(async () => {
      const VERSION = 1;
      const databaseName = "barry";
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
          draft.autoUpgrade = {
            ...initialState.autoUpgrade,
            crafts: true,
            letsy: true,
            plants: true,
            preserves: true,
            rainfall: true,
            scrap: true,
            shopping: true,
            stream: true,
            well: true,
          };
        }),
      );
    });
    cy.visit("/");
  });
});
