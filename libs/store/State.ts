import { StateAction } from "./StateAction";
import { UpgradeKey } from "./Upgrade";

export type Phase = "preEvent" | "event" | "postEvent" | "traveling" | "done";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]?: { level: number };
};
export type PurchasedTimedUpgrades = {
  [Key in UpgradeKey]?: { level: number; time: number };
};
export type ExplorationKey = "startExplore" | "researchThings";
export type Stat = "perception";
export type Resource = "food" | "savedTime";
export type State = {
  phase: Phase;
  exploration: ExplorationKey | undefined;
  time: number;
  messages: ReadonlyArray<string>;
  resources: {
    food: number;
    savedTime: number;
  };
  stats: {
    [Key in Stat]: {
      current: number;
      permanent: number;
    };
  };
  explorations: {
    [Key in ExplorationKey]?: {
      progress: number;
    };
  };
  upgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  timeline: ReadonlyArray<{
    time: number;
    action: StateAction;
  }>;
  multiplier: number;
  timers: {
    food: number;
    event: number;
    action: number;
  };
  loops: number;
};
