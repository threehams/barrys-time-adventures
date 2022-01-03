import { ActionKey } from "..";
import { GameAction } from "../GameAction";

export const gameActions: GameAction[] = [
  {
    key: "startExplore",
    name: "Explore the area",
    description: "",
    message: "",
    drain: {
      things: 1.5,
    },
    train: {
      perception: 1.5,
    },
    time: 10_000,
    requirements: {},
  },
  {
    key: "researchThings",
    name: "Research time travel",
    description: "",
    message: "",
    drain: {
      things: 1.5,
    },
    train: {
      perception: 1.5,
    },
    time: 10_000,
    requirements: {
      action: "startExplore",
    },
  },
];

export const findAction = (key: ActionKey) => {
  const found = gameActions.find((action) => action.key === key);
  if (!found) {
    throw new Error(`Could not find an action with key: ${key}`);
  }
  return found;
};
