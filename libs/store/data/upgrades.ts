import { UnlockKey, UpgradeKey } from "..";
import { Upgrade } from "../Upgrade";
import { hoursToMilliseconds } from "date-fns";

export const upgrades: Upgrade[] = [
  {
    key: "buyClothes",
    name: "Buy more clothes",
    description: "I really don't have enough clothes. I should buy some more.",
    max: 1,
    costs: {
      desperation: 0,
      money: 0,
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
    },
  },
];

export const findUpgrade = (key: UpgradeKey) => {
  const found = upgrades.find((upgrade) => upgrade.key === key);
  if (!found) {
    throw new Error(`Could not find an upgrade with key: ${key}`);
  }
  return found;
};

export const findUnlock = (key: UnlockKey) => {
  const found = upgrades.find((upgrade) => {
    return upgrade.effect.unlock === key;
  });
  if (!found) {
    throw new Error(`Could not find upgrade with unlock: ${key}`);
  }
  return found;
};
