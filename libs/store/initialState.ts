import { PurchasedUpgrades, State } from "./State";

export const initialState: State = {
  phase: "preEvent",
  time: 0,
  messages: [],
  upgrades: {} as PurchasedUpgrades,
  timeline: [],
  stats: {
    things: 0,
    desperation: 0,
    money: 0,
    savedTime: 1,
  },
  multiplier: 1,
  timers: {
    event: 0,
    things: 0,
  },
  loops: 0,
};
