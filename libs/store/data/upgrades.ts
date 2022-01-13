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
  | "PF7"
  | "PJ1"
  | "PJ2"
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
  | "PM5"
  | "TW1"
  | "EW1"
  | "EW2"
  | "EM1";
export const upgrades: Upgrade[] = [
  {
    phase: "preEvent",
    key: "PM1",
    type: "purchased",
    name: "Sell your stuff",
    description:
      "I should set up a Letsy account and pawn off some of my junk for steady income.",
    max: 50,
    costs: {
      junk: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      money: (level) => {
        return level * 5;
      },
    },
    effectDescription: "",
    flavorTexts: {},
    requirements: {},
    source: "letsy",
  },
  {
    phase: "preEvent",
    key: "PM2",
    type: "purchased",
    name: "Advertise your Letsy store",
    description: "Maybe I can get rid of these vintage Neil Breen DVDs.",
    max: 10,
    costs: {
      money: (level) => {
        return level * 50;
      },
    },
    effect: {
      type: "time",
      money: (level) => {
        return Math.pow(0.75, Math.log2(level) + 1);
      },
    },
    effectDescription: "",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM1", level: 3 },
    },
    source: "letsy",
  },
  {
    phase: "preEvent",
    key: "PM5",
    type: "purchased",
    name: "Set up multiple accounts",
    description:
      "It's against their Terms of Service, but they probably won't notice.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 200;
      },
    },
    effect: {
      type: "multiply",
      money: (level) => {
        return level * 1.1 + 1;
      },
    },
    effectDescription: "x2 sales per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM1", level: 5 },
    },
    source: "letsy",
  },
  {
    phase: "preEvent",
    key: "PM3",
    type: "purchased",
    name: "Sell some scrap art",
    description:
      "I've got a shed full of scrap metal I could weld together into art.",
    max: 50,
    costs: {
      junk: (level) => {
        return Math.pow(level, 2.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      money: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 crafts sale per level",
    flavorTexts: {},
    requirements: {
      money: 200,
    },
    source: "crafts",
  },
  {
    phase: "preEvent",
    key: "PM4",
    type: "purchased",
    name: "Sell furniture",
    description:
      "There's a market for industrial furniture. Might as well make some, for people who believe the world's just fine.",
    max: 50,
    costs: {
      junk: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "multiply",
      money: (level) => {
        return level * 1.25 + 1;
      },
    },
    effectDescription: "x2 sale value per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PM3", level: 3 },
    },
    source: "crafts",
  },
  {
    phase: "preEvent",
    key: "PJ1",
    type: "purchased",
    name: "Set up scrap delivery",
    description:
      "There's a local scrapyard I could pay for regular deliveries.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 2) + level * 10;
      },
    },
    effect: {
      type: "add",
      junk: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 scrap metal per level",
    flavorTexts: {},
    requirements: {
      money: 20,
    },
    source: "scrap",
  },
  {
    phase: "preEvent",
    key: "PJ2",
    type: "purchased",
    name: "Improve scrap quality",
    description:
      "Pay the scrapyard a bit more for less rust and more usable pieces.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 100;
      },
    },
    effect: {
      type: "multiply",
      junk: (level) => {
        return 1.25 ** level;
      },
    },
    effectDescription: "x1.25 scrap metal per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PJ1", level: 5 },
    },
    source: "scrap",
  },
  {
    phase: "preEvent",
    key: "PF1",
    type: "purchased",
    name: "Canning supplies",
    description: "I could preserve food if I got some basic canning supplies.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      food: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 preserved food per level",
    flavorTexts: {},
    requirements: {
      money: 200,
    },
    source: "preserves",
  },
  {
    phase: "preEvent",
    key: "PF2",
    type: "purchased",
    name: "Gas burner",
    description: "Buy a big old propane gas burner to boil water much faster.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "multiply",
      food: (level) => {
        return 1.2 ** level;
      },
    },
    effectDescription: "x2 preserved food per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF1", level: 3 },
    },
    source: "preserves",
  },
  {
    phase: "preEvent",
    key: "PF6",
    type: "purchased",
    name: "Pressure canner",
    description:
      "A pressure canner would let me preserve more stuff without getting botulism.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      food: (level) => {
        return Math.pow(0.85, Math.log2(level) + 1);
      },
    },
    effectDescription: "x0.8 time required for preserved food per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF1", level: 5 },
    },
    source: "preserves",
  },
  {
    phase: "preEvent",
    key: "PF3",
    type: "purchased",
    name: "Plant some fast-growing crops",
    description:
      "Looks like I'll be eating a lot of radishes and green onions.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      food: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 plant food per level",
    flavorTexts: {},
    requirements: {
      food: 100,
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "PF4",
    type: "purchased",
    name: "Set up hydroponics",
    description:
      "I can get some plants to grow faster, and more variety would be nice.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      food: (level) => {
        return Math.pow(0.8, Math.log2(level) + 1);
      },
    },
    effectDescription: "x0.8 plant growing time per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF3", level: 3 },
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "PF7",
    type: "purchased",
    name: "Buy grow lights",
    description: "More lights mean more plants, right?",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 100;
      },
    },
    effect: {
      type: "time",
      food: (level) => {
        return level * 1.15;
      },
    },
    effectDescription: "x0.8 plant growing time per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PF4", level: 5 },
    },
    source: "plants",
  },
  {
    phase: "preEvent",
    key: "PW5",
    type: "purchased",
    name: "Drill a deeper well",
    description:
      "My well's not going to collect enough water right now. I should get someone to drill deeper.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 10;
      },
    },
    effect: {
      type: "add",
      water: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 well water per level",
    flavorTexts: {},
    requirements: {
      money: 200,
    },
    source: "well",
  },
  {
    phase: "preEvent",
    key: "PW6",
    type: "purchased",
    name: "Overcharge well",
    description: "",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3) + level * 10;
      },
    },
    effect: {
      type: "multiply",
      water: (level) => {
        return 1.05 ** level;
      },
    },
    effectDescription: "x1.1 well water per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PW5", level: 5 },
    },
    source: "well",
  },
  {
    phase: "preEvent",
    key: "PW1",
    type: "purchased",
    name: "Set up rainwater collection",
    description: "Buy and set up barrels and tarps for rainwater collection.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      water: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 rainwater per level",
    flavorTexts: {},
    requirements: {
      water: 100,
    },
    source: "rainfall",
  },
  {
    phase: "preEvent",
    key: "PW2",
    type: "purchased",
    name: "Buy a cistern",
    description: "Getting a big water container should make collection easier.",
    max: 10,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      water: (level) => {
        return Math.pow(0.75, Math.log2(level) + 1);
      },
    },
    effectDescription: "x0.8 rainwater time per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PW1", level: 3 },
    },
    source: "rainfall",
  },
  {
    phase: "preEvent",
    key: "PW3",
    type: "purchased",
    name: "Buy a water filter",
    description: "I can filter some water from the stream nearby.",
    max: 50,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "add",
      water: (level) => {
        return level * 5;
      },
    },
    effectDescription: "+1 filtered water per level",
    flavorTexts: {},
    requirements: {
      water: 200,
    },
    source: "stream",
  },
  {
    phase: "preEvent",
    key: "PW4",
    type: "purchased",
    name: "Switch to an electric filter",
    description:
      "Manually cranking this filter is way too much work when I have electricity.",
    max: 10,
    costs: {
      money: (level) => {
        return Math.pow(level, 3.5) + level * 10;
      },
    },
    effect: {
      type: "time",
      water: (level) => {
        return Math.pow(0.7, Math.log2(level) + 1);
      },
    },
    effectDescription: "*0.8 filtered water time per level",
    flavorTexts: {},
    requirements: {
      upgrade: { key: "PW3", level: 3 },
    },
    source: "stream",
  },
  {
    phase: "postEvent",
    key: "TW1",
    type: "purchased",
    name: "Condensate Capture",
    description: "Pluck water out of the air instead of relying on rainfall.",
    max: 50,
    costs: {
      power: (level, distance) => {
        return Math.pow(level, 3.5) + distance * 10;
      },
    },
    effect: {
      type: "multiply",
      water: (level) => {
        return level * 1.25 + 1;
      },
    },
    effectDescription: "x2 rainwater, can collect without rainfall",
    flavorTexts: {},
    requirements: {
      exploration: "E3",
    },
    source: "rainfall",
  },
  {
    phase: "preEvent",
    key: "EW1",
    type: "event",
    name: "Rainfall stops",
    description:
      "The rain has stopped, so I'm not getting any water that way. I hope it starts up again soon.",
    max: 2,
    costs: {},
    effect: {
      type: "multiply",
      water: (level) => {
        return level - 1;
      },
    },
    effectDescription: "",
    flavorTexts: {
      1: "The rain has stopped, so I'm not getting any water that way. I hope it starts up again soon.",
      2: "The rain has stopped. Luckily, not a problem for the condensate collector. Thanks, Future Barry!",
    },
    requirements: {},
    source: "rainfall",
  },
  {
    phase: "preEvent",
    key: "EW2",
    type: "event",
    name: "Stream contaminated",
    description:
      "The stream's started to smell like paint. I'm not sure what happened, but I'm not going to trust it now.",
    max: 2,
    costs: {},
    effect: {
      type: "multiply",
      water: (level) => {
        return level - 1;
      },
    },
    effectDescription: "",
    flavorTexts: {
      1: "The stream's started to smell like paint. I'm not sure what happened, but I'm not going to trust it now.",
      2: "The stream's started to smell like paint, but that's not a problem for this filter. Nice thinking, Future Barry!",
    },
    requirements: {},
    source: "stream",
  },
  {
    phase: "preEvent",
    key: "EM1",
    type: "event",
    name: "Letsy downtime",
    description:
      "Letsy just had an outage, and it's been flaky ever since. My income there has dropped in half.",
    max: 2,
    costs: {},
    effect: {
      type: "multiply",
      money: (level) => {
        return level === 1 ? 0.5 : 1;
      },
    },
    effectDescription: "",
    flavorTexts: {
      1: "Letsy just had an outage, and it's been flaky ever since. My income there has dropped in half.",
      2: "",
    },
    requirements: {},
    source: "letsy",
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
  maxResources: Resources;
  distance: number;
  purchasedUpgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  playerExplorations: PlayerExplorations;
};
export const canPurchaseUpgrade = ({
  phase,
  upgrade,
  resources,
  maxResources,
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
      resources,
      maxResources,
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
  resources: Resources;
  maxResources: Resources;
};
export const canShowUpgrade = ({
  phase,
  upgrade,
  purchasedUpgrades,
  timedUpgrades,
  playerExplorations,
  maxResources,
}: CanShowUpgrade) => {
  if (
    upgrade.type === "event" ||
    (upgrade.phase !== phase &&
      !(upgrade.phase === "postEvent" && phase === "traveling"))
  ) {
    return false;
  }
  if (purchasedUpgrades[upgrade.key]?.level) {
    return true;
  }
  for (const [key, amount] of Object.entries(upgrade.requirements)) {
    if (
      (key === "food" || key === "water" || key === "money") &&
      maxResources[key] < (amount as number)
    ) {
      return false;
    }
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
