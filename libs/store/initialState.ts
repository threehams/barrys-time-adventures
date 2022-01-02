import { State } from "./State";

export const initialState: State = {
  action: "preparing",
  time: 0,
  things: 0,
  messages: [],
  upgrades: {},
  timeline: [],
  stats: {
    desperation: 0,
    money: 0,
  },
  multiplier: 1,
};
