import { StateAction } from "./StateAction";
import { UpgradeKey } from "./Upgrade";

export type Phase = "preEvent" | "event" | "postEvent" | "traveling" | "done";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]?: { level: number };
};
export type PurchasedTimedUpgrades = {
  [Key in UpgradeKey]?: { level: number; time: number };
};
export type ActionKey = "startExplore" | "researchThings";
export type Stat = "perception";
export type Resource = "things" | "savedTime";
export type State = {
  phase: Phase;
  action: ActionKey | undefined;
  time: number;
  messages: ReadonlyArray<string>;
  resources: {
    [Key in Resource]: number;
  };
  stats: {
    [Key in Stat]: number;
  };
  actions: {
    [Key in ActionKey]?: number;
  };
  upgrades: PurchasedUpgrades;
  timedUpgrades: PurchasedTimedUpgrades;
  timeline: ReadonlyArray<{
    time: number;
    action: StateAction;
  }>;
  multiplier: number;
  timers: {
    things: number;
    event: number;
    action: number;
  };
  loops: number;
};
