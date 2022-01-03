import { State } from "./State";

export const initialState: State = {
  phase: "preEvent",
  exploration: undefined,
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
    perception: {
      current: 0,
      permanent: 0,
    },
  },
  explorations: {},
  multiplier: 1,
  timers: {
    action: 0,
    event: 0,
    things: 0,
  },
  loops: 0,
};
