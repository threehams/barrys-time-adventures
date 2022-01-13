import localForage from "localforage";
import produce from "immer";
import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";

describe("exploration", () => {
  it.only("completes the first three explorations", () => {
    cy.fixture("exploration").then(async (data) => {
      const VERSION = 1;
      const databaseName = "reconciliation_game";
      const savedGameKey = "saved_game";
      localForage.config({
        version: VERSION,
        name: databaseName,
        storeName: databaseName,
      });
      await localForage.setItem(savedGameKey, data);
    });
    cy.visit("/");
  });

  it("runs more quickly for longer explorations", () => {
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
          draft.unlocks = {
            pastRestart: true,
          };
          draft.explorations = {
            E1: { progress: 100 },
            T1: { progress: 100 },
            T2: { progress: 100 },
            E2: { progress: 100 },
            T3: { progress: 100 },
          };
          draft.phase = "postEvent";
          draft.time = hoursToSeconds(24 * 32);
          draft.resources.food = 50_000;
          draft.resources.water = 12_500;
          draft.resources.money = 4_500;
          draft.resources.junk = 2_700;
        }),
      );
    });
    cy.visit("/");
  });

  it("generates power and drains resources", () => {
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
          draft.unlocks = {
            pastRestart: true,
            pastSpeed2x: true,
          };
          draft.explorations = {
            E1: { progress: 100 },
            T1: { progress: 100 },
            T2: { progress: 100 },
            E2: { progress: 100 },
            T3: { progress: 100 },
            E3: { progress: 100 },
            E5: { progress: 100 },
            S2: { progress: 100 },
            E7: { progress: 100 },
          };
          draft.phase = "postEvent";
          draft.time = hoursToSeconds(24 * 32);
          draft.resources.food = 50_000;
          draft.resources.water = 12_500;
          draft.resources.money = 4_500;
          draft.resources.junk = 2_700;
        }),
      );
    });
    cy.visit("/");
  });
});
