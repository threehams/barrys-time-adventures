import { ClothingSlot } from "./Garment";
import { StateAction } from "./StateAction";
import { UpgradeKey } from "./Upgrade";

type ReuseCount = number;

export type Action = "idle" | "working" | "gaming" | "sleeping";
export type WornClothing = {
  [Clothing in ClothingSlot]: { key: string; reuse: ReuseCount } | undefined;
};
export type PlannedClothing = {
  [Clothing in ClothingSlot]: { key: string } | undefined;
};

export type State = {
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
};
