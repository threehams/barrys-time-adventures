import { ExplorationKey, Resource, Stat } from ".";

export type Exploration = {
  key: ExplorationKey;
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
    action?: ExplorationKey;
  };
  message: string;
};
