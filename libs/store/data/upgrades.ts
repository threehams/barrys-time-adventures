import {
  PlayerExplorations,
  PurchasedTimedUpgrades,
  PurchasedUpgrades,
} from "..";
import { Resources } from "../Resources";
import { Upgrade } from "../Upgrade";

export type UpgradeKey =
  | "PF1"
  | "PF2"
  | "PF3"
  | "PF4"
  | "PF5"
  | "PF6"
  | "PW1"
  | "PW2"
  | "PM1"
  | "PM2"
  | "PM3"
  | "PM4"
  | "TW1";
export const upgrades: Upgrade[] = [
  {
    phase: "preEvent",
    key: "PF1",
    name: "Buy canning supplies",
    description: "I could preserve food if I got some basic canning supplies.",
    max: 5,
    costs: {
      money: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      food: (food, level) => {
        return food * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {},
  },
  {
    phase: "preEvent",
    key: "PF2",
    name: "Buy a gas burner",
    description: "Buy a big old propane gas burner to boil water much faster.",
    max: 5,
    costs: {
      money: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      food: (food, level) => {
        return food * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: "PF1",
    },
  },
  {
    phase: "preEvent",
    key: "PF6",
    name: "Buy a pressure canner",
    description:
      "A pressure canner would let me preserve more stuff without getting botulism.",
    max: 5,
    costs: {
      money: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      food: (food, level) => {
        return food * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: "PF1",
    },
  },
  {
    phase: "preEvent",
    key: "PW1",
    name: "Set up rainwater collection",
    description: "Buy and set up barrels and tarps for rainwater collection.",
    max: 5,
    costs: {
      money: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      water: (water, level) => {
        return water * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {},
  },
  {
    phase: "postEvent",
    key: "TW1",
    name: "Condensate Capture",
    description: "Pluck water out of the air instead of relying on rainfall.",
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
    requirements: {
      exploration: "T4",
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

type CanPurchaseUpgrade = {
  upgrade: Upgrade;
  resources: Resources;
  currentLevel: number | undefined;
  distance: number;
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
};
export const canPurchaseUpgrade = ({
  upgrade,
  resources,
  currentLevel,
  distance,
  purchasedUpgrades,
  timedUpgrades,
  playerExplorations,
}: CanPurchaseUpgrade) => {
  const nextLevel = (currentLevel ?? 0) + 1;
  for (const costKey of Object.keys(upgrade.costs)) {
    const checker = upgrade.costs[costKey];
    if (checker && checker(nextLevel, distance) > resources[costKey]) {
      return false;
    }
  }

  return nextLevel <= upgrade.max;
};

type CanShowUpgrade = {
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
};
const canShowUpgrade = ({}: CanShowUpgrade) => {
  return false;
};

type UpgradeCost = {
  upgrade: Upgrade;
  resources: Resources;
  currentLevel: number | undefined;
  distance: number;
};
export const upgradeCost = ({
  upgrade,
  currentLevel,
  distance,
}: UpgradeCost) => {
  const nextLevel = (currentLevel ?? 0) + 1;

  return Object.entries(upgrade.costs).map(([key, cost]) => {
    if (!cost) {
      return { key, cost: 0 };
    }
    return { key, cost: cost(nextLevel, distance) };
  });
};
