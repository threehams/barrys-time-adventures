import { ExplorationKey, Skill, UnlockKey } from ".";
import { Resource } from "./Resources";

export type Exploration = {
  key: ExplorationKey;
  name: string;
  description: string;
  time: number;
  drain: {
    [key in Resource]?: number;
  };
  train: {
    [key in Skill]?: number;
  };
  requirements: {
    action?: ExplorationKey;
  };
  unlock?: UnlockKey;
  message: string;
};
