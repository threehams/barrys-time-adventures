import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";

describe("time travel", () => {
  it("calculates the correct food", () => {
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
          draft.phase = "postEvent";
          draft.time = hoursToSeconds(24 * 32);
          draft.resources.food = 1000;
          draft.resources.savedTime = 200;
        }),
      );
    });
    cy.visit("/");
  });
});
