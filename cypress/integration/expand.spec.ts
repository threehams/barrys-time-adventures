import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import hoursToSeconds from "date-fns/hoursToSeconds";

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
          draft.phase = "expand";
          draft.loops = 30;
          draft.resources.barry = 30;
          draft.time = hoursToSeconds(24 * 45);
          draft.expandStart = hoursToSeconds(24 * 45);
        }),
      );
    });
    cy.visit("/?debug");
  });
});
