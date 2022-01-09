import { Exploration } from "../Exploration";

export type ExplorationKey =
  | "E1"
  | "T1"
  | "T2"
  | "E2"
  | "T3"
  | "E3"
  | "E4"
  | "C1"
  | "C2"
  | "F1"
  | "F2"
  | "F3"
  | "E5"
  | "E6"
  | "S1"
  | "T4";

export const explorations: Exploration[] = [
  {
    key: "E1",
    name: "Explore the area",
    description:
      "My home hasn't changed, but everything past 500 feet is shrouded in dust.",
    message:
      "Something is really messed up with the area around here. Space is warped.",
    drain: {
      food: 1,
      water: 5,
    },
    train: {
      perception: 1,
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {},
  },
  {
    key: "T1",
    name: "Watch warped spaces",
    description:
      "These warped spaces seem random, but maybe if I watch them for long enough, they'll start to make sense.",
    message: 'I\'m calling these "time holes" until I think of a better name.',
    drain: {},
    train: {
      perception: 2,
      patience: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E1",
    },
  },
  {
    key: "T2",
    name: "Watch smaller time holes",
    description:
      "I'm not ready to jump into a time hole, but watching from a distance couldn't hurt, right?",
    message: `Hey! I saw another Barry in one of the holes and called out, and he seemed to notice. It looks like I could influence the past, at least with very short messages. Maybe I'll start with "more water." Unlocked: You can change decisions you made in the past. Click a day on the timeline, then "Restart Here."`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "T1",
    },
  },
  {
    key: "E2",
    name: "Explore something",
    description: "[something something go out further?]",
    message: "",
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "T2",
    },
  },
  {
    key: "T3",
    name: "Figure out lost time",
    description:
      "Time passes more slowly when I'm closer to a time hole, which makes the rest of the world move faster. I could find out how close I can get, and tell Past Barry about this.",
    message: `For now, I could get time to pass about twice as fast. That'll be better than watching radishes grow.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E2",
    },
  },
  {
    key: "E3",
    name: "Explore outside home",
    description: "Guess it's time to head into what's left of town.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "T3",
    },
  },
  {
    key: "E4",
    name: "Explore school ruins",
    description:
      "There's a school nearby, though there isn't much left of it. This might get me some good info for Past Barry.",
    message: `Hey, there's an old #7291 generator here! I can't believe they still use these. It's not working, but I could fix it if I had the parts.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "F1",
    name: "Look for parts",
    description:
      "Someone took this thing apart. I'm going to need some M8 bolts and a socket to match.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      tech: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E4",
    },
  },
  {
    key: "F2",
    name: "Look for instructions",
    description: "",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      strength: 2,
      tech: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "F1",
    },
  },
  {
    key: "F3",
    name: "Fix the generator",
    description: "",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "F2",
    },
  },
  {
    key: "E5",
    name: "Explore machine shop",
    description:
      "I found the ruins of what looks like an old machine shop. Maybe I can find something to help out Past Barry.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "E6",
    name: "Explore big time holes",
    description:
      "There are a bunch of bigger time holes near a fasion district. I might be able to send larger items through these - maybe even travel?",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "S1",
    name: "Move wreckage",
    description:
      "There's a really interesting time hole up the stairs, but I'll have to move some wreckage out of the way to get to it.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      strength: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E6",
    },
  },
  {
    key: "T4",
    name: "Convince yourself",
    description:
      "Hey! I saw myself from just a day a ago! This time hole seems to fight me a lot less. Maybe I could just jump through?",
    message: `After a lot of arguing with Past Barry, we agreed to swap places when the time comes. I have no idea what'll happen to him, but that sounds like Future Barry problems, not mine. Unlocked: Restart after the timeskip, but keep some of your stats and knowledge. This may have consequences.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "S1",
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
