import { Game } from "./Game";
import { ClothingSlot } from "./Garment";
import { Job } from "./Job";
import { UpgradeKey } from "./Upgrade";

type ReuseCount = number;

export type Action = "idle" | "working" | "gaming" | "sleeping";
export type WornClothing = {
  [Clothing in ClothingSlot]: { key: string; reuse: ReuseCount } | undefined;
};

export type State = {
  time: number;
  money: number;
  shame: number;
  desperation: number;
  job: Job;
  game: Game;
  messages: ReadonlyArray<string>;
  closet: {
    [clothingKey: string]: {
      [Reuse: /* reuseCount */ string]: number | undefined;
    };
  };
  wornClothing: WornClothing;
  upgrades: {
    [Key in UpgradeKey]: number;
  };
  apartmentSpace: number;
  action: Action;
};
