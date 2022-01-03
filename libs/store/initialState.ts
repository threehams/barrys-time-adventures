import { State } from "./State";

export const initialState: State = {
  phase: "preEvent",
  action: undefined,
  time: 0,
  messages: ["The news has been weird lately. I feel like I should prepare."],
  upgrades: {},
  timedUpgrades: {},
  timeline: [],
  resources: {
    things: 0,
    savedTime: 1,
  },
  stats: {
    perception: 0,
  },
  actions: {},
  multiplier: 1,
  timers: {
    action: 0,
    event: 0,
    things: 0,
  },
  loops: 0,
};
