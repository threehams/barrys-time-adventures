import { Game } from "./Game";
import { Job } from "./Job";
import { UpgradeKey } from "./Upgrade";

type ReuseCount = number;
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type ClothingName = "shirt" | "pants" | "sock" | "underpants";
type Action = "idle" | "working" | "gaming" | "sleeping";

export type State = {
  day: Day;
  time: number;
  money: number;
  shame: number;
  desperation: number;
  job: Job;
  game: Game;
  clothing: {
    [Clothing in ClothingName]: {
      [Reuse in ReuseCount]: number | undefined;
    };
  };
  upgrades: {
    [Key in UpgradeKey]: number;
  };
  apartmentSpace: number;
  action: Action;
};
