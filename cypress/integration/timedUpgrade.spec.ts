import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";

describe("future", () => {
  it("sends an upgrade back in time", () => {
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
                key: "PM1",
              },
            },
            time: hoursToSeconds(24),
          });
          draft.unlocks = {
            pastRestart: true,
          };
          draft.upgrades = {
            PM1: { level: 1 },
          };
          draft.explorations = {
            E1: { progress: 100 },
            T1: { progress: 100 },
            T2: { progress: 100 },
            E2: { progress: 100 },
            T3: { progress: 100 },
            E3: { progress: 100 },
          };
          draft.phase = "postEvent";
          draft.time = hoursToSeconds(24 * 32);
          draft.resources.food = 1000;
          draft.resources.power = 100;
        }),
      );
    });
    cy.visit("/");
    cy.findByText("Send Upgrades").click();
    cy.findByRole("button", { name: /Buy/ }).click();
  });
});
