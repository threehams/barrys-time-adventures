export type UpgradeKey = string;

export type UnlockKey = "buyClothes" | "autoClothes";
export type UpgradeEffect = {
  // Unlock a particular feature permanently
  unlock?: UnlockKey;
  // Compress clothing better
  clothingVolume?: (num: number, level: number) => number;
  // Reuse clothing more times with less shame
  reuse?: (num: number, level: number) => number;
  // Make time go faster / slower
  time?: (num: number, level: number) => number;
  // Change rate of desperation increase
  desperation?: (num: number, level: number) => number;
  // Change rate of money increase
  money?: (num: number, level: number) => number;
  // Is this additive or multiplicative with other upgrades?
  type: "add" | "multiply";
};

export type Upgrade = {
  // Max level of this upgrade
  max: number;
  // Required for this upgrade to appear. Once that happens, it's
  // always visible
  requirements: {
    time: number;
    money: number;
    desperation: number;
  };
  // Required to buy this upgrade
  costs: {
    money: number;
    desperation: number;
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
