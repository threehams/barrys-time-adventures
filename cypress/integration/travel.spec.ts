import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";

describe("time travel", () => {
  it("travels to a pre-event time", () => {
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
          draft.upgrades = {
            upgradeFood: { level: 2 },
          };
          draft.timeline.push({
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "upgradeFood",
              },
            },
            time: hoursToSeconds(24),
          });
          draft.timeline.push({
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "upgradeFood",
              },
            },
            time: hoursToSeconds(49),
          });
          draft.timedUpgrades = {
            postUpgradeFood: {
              level: 1,
              time: hoursToSeconds(50),
            },
          };
          draft.phase = "traveling";
          draft.time = hoursToSeconds(24 * 60);
          draft.resources.food = 0;
        }),
      );
    });
    cy.visit("/");
  });
});
