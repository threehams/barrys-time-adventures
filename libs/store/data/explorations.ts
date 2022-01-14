import { Exploration } from "../Exploration";

export type ExplorationKey =
  | "E1"
  | "E2"
  | "E3"
  | "E4"
  | "E5"
  | "E6"
  | "E7"
  | "E8"
  | "E9"
  | "E10"
  | "E11"
  | "E12"
  | "C1"
  | "C2"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "S1"
  | "S2"
  | "S3"
  | "T1"
  | "T2"
  | "T3"
  | "T4"
  | "T5"
  | "T6"
  | "G1";

export const explorations: Exploration[] = [
  {
    key: "E1",
    name: "Explore the area",
    description:
      "My home hasn't changed, but everything past 500 feet is shrouded in dust.",
    message:
      "Something is really messed up with the area around here. Looks like desert haze, but... I can see other places in it?",
    drain: {
      food: 1,
      water: 2,
    },
    train: {
      perception: 1,
      endurance: 2,
    },
    time: 800_000,
    requirements: {},
  },
  {
    key: "T1",
    name: "Watch haze",
    description:
      "These hazy areas seem random, but maybe if I watch them for long enough, they'll start to make sense.",
    message: `I\'m definitely looking at different time periods through these. Some of these go back thousands of years. I\'m calling these "time holes" until I think of a better name.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      perception: 2,
      patience: 2,
    },
    time: 1_600_000,
    requirements: {
      action: "E1",
    },
  },
  {
    key: "T2",
    name: "Watch smaller time holes",
    description:
      "I'm not ready to jump into a time hole, but watching from a distance couldn't hurt, right?",
    message: `Hey! I saw another Barry in one of the holes and called out, and he seemed to notice. It looks like I could influence the past, at least with very short messages. Maybe I'll start with "more water."`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 2,
    },
    time: 1_600_000,
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
    time: 1_000_000,
    requirements: {
      action: "T2",
    },
  },
  {
    key: "T3",
    name: "Figure out lost time",
    description:
      "Time passes more slowly when I'm closer to a time hole, which makes the rest of the world move faster. I could find out how close I can get, and tell Past Barry about this.",
    message: `For now, I could safely get time to pass about twice as fast. That'll be better than watching radishes grow.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "E2",
    },
  },
  {
    key: "E3",
    name: "Explore outside home",
    description:
      "Guess it's time to head into what's left of town. This could be a very long trip.",
    message: `[something about this taking a while]`,
    drain: {
      food: 2,
      water: 2,
    },
    timeMultiplier: 10,
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
    time: 1_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "F1",
    name: "Look for parts",
    description:
      "Someone took this thing apart. I'm going to need some M8 bolts and a socket to match.",
    message: `It's reassembled, but still won't start. Maybe there's a troubleshooting guide around here.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      tech: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "E4",
    },
  },
  {
    key: "F2",
    name: "Look for instructions",
    description:
      "There's got to be an instruction manual around here somewhere.",
    message: `Hours later, I gave up, and finally found it taped to the bottom of the generator. Someone's laughing right now.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 4,
    },
    time: 1_000_000,
    requirements: {
      action: "F1",
    },
  },
  {
    key: "F3",
    name: "Fix the generator",
    description: "This is going to be a lot of trial and error.",
    message: `It's running! The lights are on. Time to see what else powered up. There isn't much that'll run off this.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      tech: 2,
      patience: 1,
    },
    time: 1_000_000,
    requirements: {
      action: "F2",
    },
  },
  {
    key: "T5",
    name: "Figure out computer",
    description:
      "A computer booted up, but there's no keyboard, mouse, touchscreen... anything? I feel really dumb right now.",
    message: `Turns out it's like focusing on one of those Magic Eye images - just defocus, and the computer takes over. I bet I can use this technique to shove much more information into Past Barry's head.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      tech: 2,
      patience: 1,
    },
    time: 1_000_000,
    requirements: {
      action: "F3",
    },
  },
  {
    key: "F5",
    name: "Find more useful information",
    description:
      "Now that I can communicate with Past Barry, I should see what else is on here.",
    message: `Here we go. I found a method of compressing food into smaller containers. That should help out with preservation.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      tech: 2,
      endurance: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "T5",
    },
  },
  {
    key: "E5",
    name: "Explore power plant",
    description:
      "I found the ruins of what looks like a power plant. Maybe I can find something to help out Past Barry.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "S2",
    name: "Pry open the door",
    description:
      "The building's in surprisingly good condition... meaning I'll need to break in.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      strength: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "E5",
    },
  },
  {
    key: "E7",
    name: "Search for a usable generator",
    description:
      "Most of the plant doesn't look functional, but maybe I can find something usable.",
    message: `Found a "Mr Fusion" in pretty good condition. Guess I should feed it?`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "S2",
    },
  },
  {
    key: "G1",
    name: "Generate power",
    description:
      "I can generate power by feeding this thing my resources. I'll start with any junk or money I have, since I don't think there's much use for those here.",
    message: `Mr. Fusion just coughed up the last of what I gave it and let off some smoke. I think it's generated its last.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 2,
    },
    time: 10_000_000,
    requirements: {
      action: "E7",
    },
    generates: {
      power: 2,
    },
  },
  {
    key: "E6",
    name: "Explore big time holes",
    description:
      "There are a bunch of bigger time holes near a sewage treatment plant (which thankfully hasn't run for a long time). I might be able to send larger items through these - maybe even travel?",
    message: `There's a really interesting time hole up some stairs, but I'll have to move some wreckage out of the way to get to it.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "S1",
    name: "Move wreckage",
    description:
      "Get to the big time hole by moving heavy things. Here we go, Strong Barry.",
    message: `I'm exhausted and never want to lift heavy things again, but I can get to the time hole now.`,
    drain: {
      food: 3,
      water: 4,
    },
    train: {
      strength: 3,
    },
    time: 1_000_000,
    requirements: {
      action: "E6",
    },
  },
  {
    key: "T4",
    name: "Convince yourself",
    description:
      "Hey! I saw myself from just a day a ago! This time hole seems to fight me a lot less. I think I could have a conversation with myself.",
    message: `After a lot of arguing with Past Barry, we agreed to jump in and swap places when the time comes. I have no idea what'll happen to him, but that sounds like Future Barry problems, not mine.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "S1",
    },
  },
  {
    key: "E12",
    name: "Search around for anything else",
    description:
      "This is a treatment plant. There should be something useful here for, you know, water.",
    message: `Here we go! One unused carbon nanotube filter. This would have been really useful back in the day. With enough power, I should be able to send this back to Past Barry.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 2,
    },
    time: 1_000_000,
    requirements: {
      action: "T4",
    },
  },
  {
    key: "E8",
    name: "Keep moving",
    description:
      "Head out to the light industrial zone. This may be a long walk. If I have anything to do here first, I should do it.",
    message: `Rough trip, but I'm finally glad I lived near a tech hub. Lots of places to explore here.`,
    drain: {
      food: 10,
      water: 10,
    },
    train: {
      endurance: 2,
    },
    timeMultiplier: 50,
    time: 200_000_000,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "E9",
    name: "Explore factory",
    description: "A factory! Factory HAS to mean automation, right?",
    message: ``,
    drain: {
      food: 10,
      water: 10,
    },
    train: {
      endurance: 2,
    },
    timeMultiplier: 50,
    time: 200_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "S3",
    name: "Climb to second floor",
    description:
      "There's a room that looks intact on the second floor, but I'll have to pile things up to reach it.",
    message: `There's a whole stockpile of smartphone-looking things, and nearly every battery on every one of these is dead. Maybe one of them is still alive.`,
    drain: {
      food: 5,
      water: 5,
    },
    train: {
      strength: 2,
    },
    timeMultiplier: 50,
    time: 200_000_000,
    requirements: {
      action: "E9",
    },
  },
  {
    key: "F4",
    name: "Find a working smartphone thing",
    description:
      "One of thigns things has to still have a working battery. Hope I don't have anything else to do today.",
    message: `Found one! This is way beyond a smartphone - it could purchase just about anything in the world in one tap. Future people were even more into buying stuff than we were. I'll send one of these to Past Barry right away.`,
    drain: {
      food: 3,
      water: 5,
    },
    train: {
      patience: 2,
      tech: 2,
    },
    timeMultiplier: 50,
    time: 200_000_000,
    requirements: {
      action: "S3",
    },
  },
  {
    key: "E10",
    name: "Explore arcology",
    description: "Things are bad here, but are they this bad everywhere?",
    message: `Things are this bad everywhere. I didn't meet anyone.`,
    drain: {
      food: 20,
      water: 20,
    },
    train: {
      endurance: 2,
    },
    timeMultiplier: 500,
    time: 2_000_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "E10",
    name: "Explore [other place]",
    description: "Things are bad here, but are they this bad everywhere?",
    message: `Things are this bad everywhere. I didn't meet anyone.`,
    drain: {
      food: 20,
      water: 20,
    },
    train: {
      endurance: 2,
    },
    timeMultiplier: 500,
    time: 2_000_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "E11",
    name: "Travel to next city",
    description:
      "Things are bad here, but are they this bad everywhere? This will be the longest trip so far.",
    message: `Things are this bad everywhere. I didn't meet anyone.`,
    drain: {
      food: 20,
      water: 20,
    },
    train: {
      endurance: 2,
    },
    timeMultiplier: 500,
    time: 2_000_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "T6",
    name: "Converge timelines",
    description:
      "I can't leave my other selves trapped. We need to wait until we're all visible, then jump at the same time. This could take a very long time.",
    message: "",
    drain: {
      food: 20,
      water: 20,
    },
    train: {
      patience: 2,
    },
    timeMultiplier: 100,
    time: 2_000_000_000,
    requirements: {
      action: "E11",
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
