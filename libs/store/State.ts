import { ExplorationKey } from "./data/explorations";
import { UpgradeKey } from "./data/upgrades";
import { Resources } from "./Resources";
import { StateAction } from "./StateAction";

export type Phase = "preEvent" | "event" | "postEvent" | "traveling" | "done";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]?: { level: number };
};
export type PurchasedTimedUpgrades = {
  [Key in UpgradeKey]?: { level: number; time: number };
};
export type PlayerExplorations = {
  [Key in ExplorationKey]?: {
    progress: number;
  };
};
type Severity = "note" | "alert";
export type Message = { text: string; severity: Severity };
export type Stat =
  | "perception"
  | "endurance"
  | "patience"
  | "tech"
  | "strength";
export type State = {
  phase: Phase;
  exploration: ExplorationKey | undefined;
  time: number;
  messages: ReadonlyArray<string>;
  resources: Resources;
  stats: {
    [Key in Stat]: {
      current: number;
      permanent: number;
    };
  };
  explorations: PlayerExplorations;
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
    water: number;
    money: number;
  };
  loops: number;
};
