import { hoursToSeconds } from "date-fns";
import { State } from "./State";

const STARTING_MONEY = 1000;
const STARTING_JUNK = 1000;

export const initialState: State = {
  phase: "preEvent",
  exploration: undefined,
  time: 0,
  messages: [
    "The news has been weird lately. I feel like I should prepare.",
    "My fridge has nothing but condiments.",
  ],
  upgrades: {
    PF1: { level: 1 },
    PW1: { level: 1 },
    PM1: { level: 1 },
  },
  timedUpgrades: {
    EW1: {
      time: hoursToSeconds(15 * 24),
      level: 1,
    },
    EW2: {
      time: hoursToSeconds(21 * 24),
      level: 1,
    },
    EM1: {
      time: hoursToSeconds(11 * 24),
      level: 1,
    },
  },
  timeline: [],
  resources: {
    money: STARTING_MONEY,
    water: 0,
    food: 0,
    junk: STARTING_JUNK,
    savedTime: 1,
  },
  skills: {
    perception: {
      current: 1,
      permanent: 0,
    },
    endurance: {
      current: 1,
      permanent: 0,
    },
    patience: {
      current: 1,
      permanent: 0,
    },
    strength: {
      current: 1,
      permanent: 0,
    },
    tech: {
      current: 1,
      permanent: 0,
    },
  },
  explorations: {},
  multiplier: 1,
  timers: {
    action: 0,
    event: 0,
    letsy: 0,
    crafts: 0,
    shopping: 0,
    plants: 0,
    preserves: 0,
    rainfall: 0,
    stream: 0,
    well: 0,
    food: 0,
    junk: 0,
    money: 0,
    savedTime: 0,
    water: 0,
  },
  loops: 0,
};
