import { StateAction } from "./StateAction";
import { UpgradeKey } from "./Upgrade";

export type Phase = "preEvent" | "event" | "postEvent" | "traveling" | "done";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]?: number;
};
export type PurchasedTimedUpgrades = {
  [Key in UpgradeKey]?: { level: number; time: number };
};
export type ActionKey = "";
export type State = {
  phase: Phase;
  action: ActionKey;
  time: number;
  messages: ReadonlyArray<string>;
  resources: {
    things: number;
    savedTime: number;
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
