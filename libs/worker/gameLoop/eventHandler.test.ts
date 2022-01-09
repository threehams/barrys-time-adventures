import { initialState } from "@laundry/store";
import { hoursToSeconds } from "date-fns";
import produce from "immer";
import { eventHandler } from "./eventHandler";
import { describe, expect, it } from "@jest/globals";

describe("eventHandler", () => {
  describe("TRAVEL", () => {
    it("replays the game up to the specified day", () => {
      const state = produce(initialState, (draft) => {
        draft.upgrades = {
          PF1: { level: 2 },
        };
        draft.timeline = [
          {
            time: 1000,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PF1",
              },
            },
          },
          {
            time: 1001,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PF1",
              },
            },
          },
        ];
        eventHandler(draft, {
          type: "TRAVEL",
          payload: {
            day: 1,
          },
        });
      });
      expect(state.time).toEqual(hoursToSeconds(24));
      expect(state.upgrades).toEqual({
        ...initialState.upgrades,
        PF1: { level: 3 },
      });
      expect(state.timeline).toEqual([
        {
          time: 1000,
          action: {
            type: "BUY_UPGRADE",
            payload: {
              key: "PF1",
            },
          },
        },
        {
          time: 1001,
          action: {
            type: "BUY_UPGRADE",
            payload: {
              key: "PF1",
            },
          },
        },
      ]);
    });

    it("resets upgrades on and after the specified day", () => {
      const state = produce(initialState, (draft) => {
        draft.upgrades = {
          PF1: { level: 2 },
        };
        draft.timeline = [
          {
            time: 1000,
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PF1",
              },
            },
          },
          {
            time: hoursToSeconds(25),
            action: {
              type: "BUY_UPGRADE",
              payload: {
                key: "PF1",
              },
            },
          },
        ];
        eventHandler(draft, {
          type: "TRAVEL",
          payload: {
            day: 1,
          },
        });
      });
      expect(state.time).toEqual(hoursToSeconds(24));
      expect(state.upgrades).toEqual({
        ...initialState.upgrades,
        PF1: { level: 2 },
      });
      expect(state.timeline).toEqual([
        {
          time: 1000,
          action: {
            type: "BUY_UPGRADE",
            payload: {
              key: "PF1",
            },
          },
        },
      ]);
    });
  });
});
