import { StateAction } from "./StateAction";
import { UpgradeKey } from "./Upgrade";

export type Phase = "preEvent" | "event" | "postEvent";
export type PurchasedUpgrades = {
  [Key in UpgradeKey]: number | undefined;
};
export type State = {
  phase: Phase;
  time: number;
  messages: ReadonlyArray<string>;
  stats: {
    things: number;
    money: number;
    desperation: number;
    savedTime: number;
  };
  upgrades: PurchasedUpgrades;
  timeline: ReadonlyArray<{
    time: number;
    action: StateAction;
  }>;
  multiplier: number;
  timers: {
    things: number;
    event: number;
  };
  loops: number;
};
