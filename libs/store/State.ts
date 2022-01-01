import { StateAction } from "./StateAction";
import { UpgradeKey } from "./Upgrade";

export type Action = "preparing" | "idle" | "running";

export type State = {
  action: Action;
  time: number;
  things: number;
  messages: ReadonlyArray<string>;
  stats: {
    money: number;
    desperation: number;
  };
  upgrades: {
    [Key in UpgradeKey]: number | undefined;
  };
  timeline: ReadonlyArray<{
    time: number;
    action: StateAction;
  }>;
  multiplier: number;
};
