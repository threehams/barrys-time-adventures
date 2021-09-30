import { Upgrade } from "@laundry/store";

export const reuseUpgrades: Upgrade[] = [
  {
    key: "reuse-alternate",
    name: "Alternate clothes",
    description: "Don't wear the same dirty clothes twice in a row.",
    max: 3,
    costs: {
      money: 0,
      desperation: 0,
      shame: 10,
    },
    effects: [
      {
        type: "add",
        reuse: (value, level) => value * Math.pow(0.75, level),
      },
    ],
    flavorTexts: {
      0: "As long as I don't wear the same clothes two days in a row, who's going to notice?",
      1: "I guess it's fine as long as it's not the same shirt three days in a row.",
      2: "No one can see my underpants, so do those even matter?",
    },
    requirements: {
      money: 0,
      desperation: 0,
      shame: 5,
      space: 0,
    },
  },
];
