import { hoursToSeconds, minutesToSeconds } from "date-fns";
import { NewsMessage } from "../NewsMessage";

export const news: NewsMessage[] = [
  {
    phase: "preEvent",
    time: hoursToSeconds(24 * 5 + 8),
    text: "News: All Crops in State of Indiana Wither Overnight",
  },
  {
    phase: "preEvent",
    time: hoursToSeconds(24 * 7 + 1) + minutesToSeconds(32),
    text: "News: Library of Alexandria Appears in New Mexico Ranch",
  },
  {
    phase: "preEvent",
    time: hoursToSeconds(24 * 5 + 9) + minutesToSeconds(45),
    text: "News: Phillipines' Garcia Expands Lockdowns",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 1 + 9) + minutesToSeconds(10),
    text: "Barry News Network: Betting Starts for 1st Annual Running of the Barrys",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 3 + 9) + minutesToSeconds(10),
    text: "BNN: Talks Break Down Between Holy Kingdom of Barry and Free Barry Republic",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 5 + 9) + minutesToSeconds(10),
    text: "BNN: Don't Fall for Common Scam: Three-Eyed Barrys Can't Read Your Mind",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 7 + 9) + minutesToSeconds(10),
    text: "BNN: Local Barry Illegally Changes Name to Larry",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 9 + 9) + minutesToSeconds(10),
    text: "BNN: Dangerous Gangs of Average Barrys Targeting Mutant Barrys",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 11 + 9) + minutesToSeconds(10),
    text: "BNN: Great British Baking Barry Crowned This Year's Winner: One Very Berry Baking Barry Barry",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 13 + 9) + minutesToSeconds(10),
    text: "Hostage Situation at Barrytown National Bank: Hostage Takers and Hostages Lose Track of Who is Who, Take Each Other Hostage at Random",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 15 + 9) + minutesToSeconds(10),
    text: "BNN: Lead Actor Barry 617: \"It's all about being the best Barry you can be, y'know?\"",
  },
  {
    phase: "expand",
    time: hoursToSeconds(24 * 17 + 9) + minutesToSeconds(10),
    text: "BNN: President Barry Eases Concerns Over Drop in National Barry Index",
  },
  {
    phase: "expand",
    text: "Global Food Supply Strained by Number of Barrys",
    resources: {
      barry: 1_000_000_000,
    },
  },
  {
    phase: "expand",
    text: "Barrys Unable to Multiply Faster Than Death Rate",
    resources: {
      barry: 6_000_000_000,
    },
  },
];

/*
"BNN: Are you eating too many cheese curls? Our dietician says you obviously are, because it's our favorite food."
*/
