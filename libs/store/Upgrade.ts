import { ExplorationKey, Phase, SourceKey, UnlockKey, UpgradeKey } from ".";

export type UpgradeEffect = {
  unlock?: UnlockKey;
  food?: (level: number) => number;
  water?: (level: number) => number;
  money?: (level: number) => number;
  junk?: (level: number) => number;
  savedTime?: (level: number) => number;
  // Is this additive or multiplicative with other upgrades?
  type: "add" | "multiply" | "time";
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
    exploration?: ExplorationKey;
    upgrade?: { key: UpgradeKey; level: number };
  };
  type: "purchased" | "event";
  // Required to buy this upgrade
  costs: {
    money?: (level: number, distance: number) => number;
    water?: (level: number, distance: number) => number;
    food?: (level: number, distance: number) => number;
    junk?: (level: number, distance: number) => number;
    savedTime?: (level: number, distance: number) => number;
  };
  // Readable name in-game
  name: string;
  // Flavor text for all levels
  description: string;
  // String representation of the effect this upgrade has
  effectDescription: string;
  // Source
  source: SourceKey;
  // Precise key for the upgrade (not string)
  key: UpgradeKey;
  // Changes caused by this upgrade
  effect: UpgradeEffect;
  // Message shown with each upgrade
  flavorTexts: {
    [level: number]: string | undefined;
  };
};
