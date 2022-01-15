import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import hoursToSeconds from "date-fns/hoursToSeconds";

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
          draft.phase = "collapse";
          draft.loops = 30;
          draft.resources.barry = 6_000_000_000;
          draft.time = hoursToSeconds(24 * 60);
          draft.collapseStart = hoursToSeconds(24 * 60);
        }),
      );
    });
    cy.visit("/?debug");
  });
});
