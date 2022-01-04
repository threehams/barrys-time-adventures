import { ExplorationKey, Phase } from ".";

export type UpgradeKey = "upgradeFood" | "postUpgradeFood" | "rainwater";

export type UnlockKey = undefined;
export type UpgradeEffect = {
  // Unlock a particular feature permanently
  unlock?: UnlockKey;
  // Change rate of food increase
  food?: (num: number, level: number) => number;
  // Change rate of water increase
  water?: (num: number, level: number) => number;
  // Change rate of money increase
  money?: (num: number, level: number) => number;
  // Is this additive or multiplicative with other upgrades?
  type: "add" | "multiply";
};

export type Upgrade = {
  phase: Phase;
  // Max level of this upgrade
  max: number;
  // Required for this upgrade to appear. Once that happens, it's
  // always visible
  requirements: {
    money?: number;
    water?: number;
    food?: number;
    savedTime?: number;
    action?: ExplorationKey;
    upgrade?: UpgradeKey;
  };
  // Required to buy this upgrade
  costs: {
    money?: (level: number, distance: number) => number;
    water?: (level: number, distance: number) => number;
    food?: (level: number, distance: number) => number;
    savedTime?: (level: number, distance: number) => number;
  };
  // Readable name in-game
  name: string;
  // Flavor text for all levels
  description: string;
  // Precise key for the upgrade (not string)
  key: UpgradeKey;
  // Changes caused by this upgrade
  effect: UpgradeEffect;
  // Message shown with each upgrade
  flavorTexts: {
    [level: number]: string | undefined;
  };
};
