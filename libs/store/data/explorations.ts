import { ExplorationKey } from "..";
import { Exploration } from "../Exploration";

export const explorations: Exploration[] = [
  {
    key: "startExplore",
    name: "Explore the area",
    description:
      "Your home hasn't changed, but everything past 500 feet is a desert. Find your bearings.",
    message: "You find some stuff.",
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

export const findExploration = (key: ExplorationKey) => {
  const found = explorations.find((action) => action.key === key);
  if (!found) {
    throw new Error(`Could not find an action with key: ${key}`);
  }
  return found;
};
