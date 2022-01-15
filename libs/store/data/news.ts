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
    time: hoursToSeconds(24 * 12 + 9) + minutesToSeconds(45),
    text: "News: Phillipines' Garcia Expands Lockdowns",
  },
  {
    phase: "expand",
    time: hoursToSeconds(16) + minutesToSeconds(10),
    text: "Barry News Network: Betting Starts for 1st Annual Running of the Barrys",
  },
  {
    phase: "expand",
    time: hoursToSeconds(22) + minutesToSeconds(10),
    text: "BNN: Talks Break Down Between Holy Kingdom of Barry and Free Barry Republic",
  },
  {
    phase: "expand",
    time: hoursToSeconds(27) + minutesToSeconds(10),
    text: "BNN: Don't Fall for Common Scam: Three-Eyed Barrys Can't Read Your Mind",
  },
  {
    phase: "expand",
    time: hoursToSeconds(36),
    text: "BNN: Local Barry Illegally Changes Name to Larry",
  },
  {
    phase: "expand",
    time: hoursToSeconds(42),
    text: "BNN: Dangerous Gangs of Average Barrys Targeting Mutant Barrys",
  },
  {
    phase: "expand",
    time: hoursToSeconds(50),
    text: "BNN: Great British Baking Barry Crowned This Year's Winner: One Very Berry Baking Barry Barry",
  },
  {
    phase: "expand",
    time: hoursToSeconds(58),
    text: "Hostage Situation at Barrytown National Bank: Hostage Takers and Hostages Lose Track of Who is Who, Take Each Other Hostage at Random",
  },
  {
    phase: "expand",
    time: hoursToSeconds(69),
    text: "BNN: Lead Actor Barry 617: \"It's all about being the best Barry you can be, y'know?\"",
  },
  {
    phase: "expand",
    time: hoursToSeconds(82),
    text: "BNN: President Barry Eases Concerns Over Drop in National Barry Index",
  },
  {
    phase: "expand",
    text: "BNN: Global Food Supply Strained by Number of Barrys",
    time: hoursToSeconds(90),
  },
  {
    phase: "collapse",
    text: "BNN: Worldwide Famine Strikes Barry-Run Nations",
    time: hoursToSeconds(7) + minutesToSeconds(10),
  },
  {
    phase: "collapse",
    text: "BNN: Mass Protests in Barrytown",
    time: hoursToSeconds(14) + minutesToSeconds(10),
  },
  {
    phase: "collapse",
    text: "BNN: Mutant Barrys and Average Barrys Clash Over Remaining Fresh Water",
    time: hoursToSeconds(19) + minutesToSeconds(10),
  },
  {
    phase: "collapse",
    text: "BNN: Barry News Network Loses 95% of Workforce, Unable to Continue Operations",
    time: hoursToSeconds(26) + minutesToSeconds(0),
  },
  {
    phase: "collapse",
    text: "I feel like this may have all gotten a little out of hand.",
    level: "info",
    time: hoursToSeconds(40) + minutesToSeconds(10),
  },
  {
    phase: "collapse",
    text: "[something depressing]",
    level: "info",
    time: hoursToSeconds(58) + minutesToSeconds(10),
  },
];
