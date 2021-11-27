import { Upgrade } from "@laundry/store";
import { hoursToMilliseconds } from "date-fns";

export const unlockUpgrades: Upgrade[] = [
  {
    key: "buyClothes",
    name: "Buy more clothes",
    description: "I really don't have enough clothes. I should buy some more.",
    max: 1,
    costs: {
      desperation: 0,
      money: 0,
      shame: 0,
    },
    effect: {
      type: "add",
      unlock: "buyClothes",
    },
    flavorTexts: {
      1: "I found a pretty good online store.",
    },
    requirements: {
      time: hoursToMilliseconds(24 * 5),
      desperation: 0,
      money: 0,
      shame: 0,
      space: 0,
    },
  },
  {
    key: "autoClothes",
    name: "Plan out clothing in advance",
    description:
      "I don't have that many clothes. I could just wear the same sort of thing each day.",
    max: 1,
    costs: {
      desperation: 0,
      money: 0,
      shame: 0,
    },
    effect: {
      type: "add",
      unlock: "autoClothes",
    },
    flavorTexts: {
      1: "Done",
    },
    requirements: {
      time: hoursToMilliseconds(24 * 5),
      desperation: 0,
      money: 0,
      shame: 0,
      space: 0,
    },
  },
];
