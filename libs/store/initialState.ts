import { hoursToSeconds } from "date-fns";
import { State } from "./State";

const STARTING_JUNK = 200;

export const initialState: State = {
  replay: false,
  phase: "preEvent",
  exploration: undefined,
  time: 0,
  messages: [
    {
      priority: "info",
      text: "The news has been weird lately. I feel like I should prepare.",
    },
    { priority: "info", text: "My fridge has nothing but condiments." },
  ],
  upgrades: {},
  timedUpgrades: {
    EW1: {
      time: hoursToSeconds(7 * 24),
      level: 1,
    },
    EW2: {
      time: hoursToSeconds(9 * 24),
      level: 1,
    },
    EM1: {
      time: hoursToSeconds(14 * 24),
      level: 1,
    },
  },
  timeline: [],
  resources: {
    money: 0,
    water: 0,
    food: 0,
    junk: STARTING_JUNK,
    power: 0,
  },
  maxResources: {
    money: 0,
    water: 0,
    food: 0,
    junk: STARTING_JUNK,
    power: 0,
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
  multiplier: 2,
  timers: {
    autoPurchase: 0,
    scrap: 0,
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
    power: 0,
    water: 0,
  },
  loops: 0,
  unlocks: {},
  autoUpgrade: {},
};
