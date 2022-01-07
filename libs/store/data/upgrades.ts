import {
  Phase,
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
  | "PW3"
  | "PW4"
  | "PW5"
  | "PW6"
  | "PM1"
  | "PM2"
  | "PM3"
  | "PM4"
  | "TW1";
export const upgrades: Upgrade[] = [
  {
    phase: "preEvent",
    key: "PF1",
    name: "Canning supplies",
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
    name: "Gas burner",
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
      upgrade: { key: "PF1", level: 1 },
    },
  },
  {
    phase: "preEvent",
    key: "PF6",
    name: "Pressure canner",
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
      upgrade: { key: "PF1", level: 1 },
    },
  },
  {
    phase: "preEvent",
    key: "PF3",
    name: "Plant some fast-growing crops",
    description:
      "Looks like I'll be eating a lot of radishes and green onions.",
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
    key: "PF4",
    name: "Set up hydroponics",
    description:
      "I can get some plants to grow faster, and more variety would be nice.",
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
      upgrade: { key: "PF3", level: 1 },
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
    phase: "preEvent",
    key: "PW2",
    name: "Buy a cistern",
    description: "Getting a big water container should make collection easier.",
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
    requirements: {
      upgrade: { key: "PW1", level: 1 },
    },
  },
  {
    phase: "preEvent",
    key: "PW3",
    name: "Buy a water filter",
    description: "I can filter some water from the stream nearby.",
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
    phase: "preEvent",
    key: "PW4",
    name: "Switch to an electric filter",
    description:
      "Manually cranking this filter is way too much work when I have electricity.",
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
    requirements: {
      upgrade: { key: "PW4", level: 1 },
    },
  },
  {
    phase: "preEvent",
    key: "PW5",
    name: "Drill a deeper well",
    description:
      "My well's not going to collect enough water right now. I should get someone to drill deeper.",
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
    phase: "preEvent",
    key: "PW6",
    name: "Overcharge well",
    description: "",
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
    requirements: {
      upgrade: { key: "PW5", level: 1 },
    },
  },
  {
    phase: "preEvent",
    key: "PM1",
    name: "Sell your stuff",
    description:
      "I should set up a Letsy account and pawn off some of my junk.",
    max: 5,
    costs: {
      junk: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      money: (money, level) => {
        return money * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {},
  },
  {
    phase: "preEvent",
    key: "PM2",
    name: "Advertise your Letsy store",
    description: "Maybe I can get rid of these vintage Neil Breen DVDs.",
    max: 5,
    costs: {
      money: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      money: (money, level) => {
        return money * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM1", level: 1 },
    },
  },
  {
    phase: "preEvent",
    key: "PM3",
    name: "Sell some scrap art",
    description:
      "I've got a shed full of scrap metal I could weld together into art.",
    max: 5,
    costs: {
      junk: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      money: (money, level) => {
        return money * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {},
  },
  {
    phase: "preEvent",
    key: "PM4",
    name: "Sell some scrap art",
    description:
      "There's a market for industrial furniture. Might as well make some, for people who believe the world's just fine.",
    max: 5,
    costs: {
      junk: (level) => {
        return level * 10;
      },
    },
    effect: {
      type: "add",
      money: (money, level) => {
        return money * (level + 1);
      },
    },
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM3", level: 1 },
    },
  },
  {
    phase: "postEvent",
    key: "TW1",
    name: "Condensate Capture",
    description: "Pluck water out of the air instead of relying on rainfall.",
    max: 5,
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
  phase: Phase;
  upgrade: Upgrade;
  resources: Resources;
  distance: number;
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
};
export const canPurchaseUpgrade = ({
  phase,
  upgrade,
  resources,
  distance,
  purchasedUpgrades,
  timedUpgrades,
  playerExplorations,
}: CanPurchaseUpgrade) => {
  const currentLevel =
    purchasedUpgrades[upgrade.key]?.level ?? timedUpgrades[upgrade.key]?.level;
  if (
    !canShowUpgrade({
      phase,
      upgrade,
      purchasedUpgrades,
      timedUpgrades,
      playerExplorations,
    })
  ) {
    return false;
  }

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
  phase: Phase;
  upgrade: Upgrade;
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
};
export const canShowUpgrade = ({
  phase,
  upgrade,
  purchasedUpgrades,
  timedUpgrades,
  playerExplorations,
}: CanShowUpgrade) => {
  if (
    upgrade.phase !== phase &&
    !(upgrade.phase === "postEvent" && phase === "traveling")
  ) {
    return false;
  }
  if (
    upgrade.requirements.exploration &&
    playerExplorations[upgrade.requirements.exploration]?.progress !== 100
  ) {
    return false;
  }
  const requiredUpgrade = upgrade.requirements.upgrade;
  if (
    requiredUpgrade &&
    !(
      (purchasedUpgrades[requiredUpgrade.key]?.level ?? 0) >=
        requiredUpgrade.level ||
      (timedUpgrades[requiredUpgrade.key]?.level ?? 0) >= requiredUpgrade.level
    )
  ) {
    return false;
  }
  return true;
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
