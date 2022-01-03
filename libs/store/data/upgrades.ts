import { UnlockKey, UpgradeKey } from "..";
import { Upgrade } from "../Upgrade";

export const upgrades: Upgrade[] = [
  {
    phase: "preEvent",
    key: "upgradeFood",
    name: "Make food faster",
    description: "",
    max: 100,
    costs: {
      food: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      food: (food, level) => {
        return food * (level + 1);
      },
    },
    flavorTexts: {
      1: "Set up something to make food faster.",
    },
    requirements: {},
  },
  {
    phase: "postEvent",
    key: "postUpgradeFood",
    name: "Improve thing construction",
    description: "Use future tech to make food faster than ever before",
    max: 10,
    costs: {
      savedTime: (level, distance) => {
        return level * 100 + distance * 10;
      },
    },
    effect: {
      type: "add",
      food: (food, level) => {
        return food * (level + 1);
      },
    },
    flavorTexts: {
      1: "Upgrade from the future!",
    },
    requirements: {},
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
