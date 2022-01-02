import { State } from "./State";

export const initialState: State = {
  action: "preparing",
  time: 0,
  messages: [],
  upgrades: {},
  timeline: [],
  stats: {
    things: 0,
    desperation: 0,
    money: 0,
  },
  multiplier: 1,
  timers: {
    things: 0,
  },
};
