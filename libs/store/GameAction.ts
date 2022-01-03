import { ActionKey, Resource, Stat } from ".";

export type GameAction = {
  key: ActionKey;
  name: string;
  description: string;
  time: number;
  drain: {
    [key in Resource]?: number;
  };
  train: {
    [key in Stat]?: number;
  };
  requirements: {
    action?: ActionKey;
  };
  message: string;
};
