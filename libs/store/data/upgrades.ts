import { UnlockKey, UpgradeKey } from "..";
import { Upgrade } from "../Upgrade";

export const upgrades: Upgrade[] = [
  {
    phase: "preEvent",
    key: "upgradeThings",
    name: "Make things faster",
    description: "",
    max: 100,
    costs: {
      things: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      things: (things, level) => {
        return things * (level + 1);
      },
    },
    flavorTexts: {
      1: "Set up something to make things faster.",
    },
    requirements: {},
  },
  {
    phase: "postEvent",
    key: "postUpgradeThings",
    name: "Improve thing construction",
    description: "Use future tech to make things faster than ever before",
    max: 10,
    costs: {
      savedTime: (level) => {
        return level * 1;
      },
    },
    effect: {
      type: "add",
      things: (things, level) => {
        return things * (level + 1);
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
