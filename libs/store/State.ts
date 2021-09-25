import { Game } from "./Game";
import { Job } from "./Job";
import { UpgradeKey } from "./Upgrade";

type ReuseCount = number;

export type ClothingName = "shirt" | "pants" | "sock" | "underpants";
export type Action = "idle" | "working" | "gaming" | "sleeping";
export type WornClothing = {
  [Clothing in ClothingName]: ReuseCount | undefined;
};

export type State = {
  time: number;
  money: number;
  shame: number;
  desperation: number;
  job: Job;
  game: Game;
  messages: ReadonlyArray<string>;
  clothing: {
    [Clothing in ClothingName]: {
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
