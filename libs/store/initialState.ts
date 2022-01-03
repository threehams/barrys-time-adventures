import { State } from "./State";

const STARTING_MONEY = 1000;

export const initialState: State = {
  phase: "preEvent",
  exploration: undefined,
  time: 0,
  messages: [
    "The news has been weird lately. I feel like I should prepare.",
    "My fridge has nothing but condiments.",
  ],
  upgrades: {},
  timedUpgrades: {},
  timeline: [],
  resources: {
    money: STARTING_MONEY,
    water: 0,
    food: 0,
    savedTime: 1,
  },
  stats: {
    perception: {
      current: 1,
      permanent: 0,
    },
  },
  explorations: {},
  multiplier: 1,
  timers: {
    action: 0,
    event: 0,
    food: 0,
    water: 0,
    money: 0,
  },
  loops: 0,
};
