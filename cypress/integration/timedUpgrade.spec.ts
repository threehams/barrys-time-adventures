import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";

describe("time travel", () => {
  it("calculates the correct things", () => {
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
          draft.timeline.push({
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "upgradeThings",
              },
            },
            time: hoursToSeconds(24),
          });
          draft.upgrades = {
            upgradeThings: { level: 1 },
          };
          draft.actions = {
            researchThings: 100,
            startExplore: 100,
          };
          draft.phase = "postEvent";
          draft.time = hoursToSeconds(24 * 32);
          draft.resources.things = 1000;
          draft.resources.savedTime = 200;
        }),
      );
    });
    cy.visit("/");
    cy.findByText("Upgrades").click();
  });
});
