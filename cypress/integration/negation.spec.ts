import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";

describe("new game", () => {
  it("negates negative effects", () => {
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
          draft.unlocks.timelineEvents = true;
          draft.unlocks.pastRestart = true;
          draft.autoUpgrade = {
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
          draft.timedUpgrades = {
            ...initialState.timedUpgrades,
            TF1: { level: 5, time: 0 },
            TM1: { level: 5, time: 0 },
            TW1: { level: 5, time: 0 },
            TW2: { level: 5, time: 0 },
          };
        }),
      );
    });
    cy.visit("/");
  });
});
