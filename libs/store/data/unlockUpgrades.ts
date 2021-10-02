import { Upgrade } from "@laundry/store";

export const unlockUpgrades: Upgrade[] = [
  {
    key: "buyClothes",
    name: "Buy more clothes",
    description: "I really don't have enough clothes. I should buy some more.",
    max: 1,
    costs: {
      desperation: 0,
      money: 0,
      shame: 0,
    },
    effects: [
      {
        type: "add",
        unlock: "buyClothes",
      },
    ],
    flavorTexts: {
      1: "I found a pretty good online store.",
    },
    requirements: {
      time: 86_400_000 * 5,
      desperation: 0,
      money: 0,
      shame: 0,
      space: 0,
    },
  },
];
