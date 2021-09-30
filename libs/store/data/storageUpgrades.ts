import { Upgrade } from "@laundry/store";

export const storageUpgrades: Upgrade[] = [
  {
    key: "clothes-storage-oven",
    name: "Store clothes in oven",
    description: "There's a lot of empty space here.",
    max: 2,
    costs: {
      desperation: 1_000,
      money: 0,
      shame: 0,
    },
    effects: [
      {
        clothingVolume: (val) => val * 0.5,
        type: "add",
      },
    ],
    flavorTexts: {
      1: "I don't really need to cook, I guess...",
      2: "Maybe if I take out the racks?",
    },
    requirements: {
      desperation: 500,
      money: 0,
      shame: 0,
      space: 0,
    },
  },
  {
    key: "hamper",
    name: "Buy a hamper",
    description: "Might as well buy something designed for it",
    max: 2,
    costs: {
      desperation: 100,
      money: 30,
      shame: 0,
    },
    effects: [
      {
        clothingVolume: (val, level) => val * Math.pow(0.75, level),
        type: "add",
      },
    ],
    flavorTexts: {
      1: "It's hamper! It's hamper! It's big, it's light, it's plastic.",
      2: "This one has wheels! This should make laundry a lot easier.",
    },
    requirements: {
      desperation: 0,
      money: 10,
      shame: 0,
      space: 0,
    },
  },
];
