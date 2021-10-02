import { Garment } from "../Garment";

export const garments: Garment[] = [
  {
    key: "tshirt",
    cost: 20,
    name: "T-Shirt",
    slots: ["body"],
  },
  {
    key: "jeans",
    cost: 20,
    name: "Jeans",
    slots: ["legs"],
  },
  {
    key: "sleeppants",
    cost: 20,
    name: "Sleep Pants",
    slots: ["legs"],
  },
  {
    key: "leggings",
    cost: 20,
    name: "Leggings",
    slots: ["legs"],
  },
  {
    key: "skirt",
    cost: 20,
    name: "Skirt",
    slots: ["legs"],
  },
  {
    key: "socks",
    cost: 5,
    name: "Socks",
    slots: ["feet"],
  },
  {
    key: "boxers",
    cost: 5,
    name: "Boxers",
    slots: ["crotch"],
  },
  {
    key: "briefs",
    cost: 5,
    name: "Briefs",
    slots: ["crotch"],
  },
  {
    key: "panties",
    cost: 5,
    name: "Panties",
    slots: ["crotch"],
  },
  {
    key: "dress",
    cost: 40,
    name: "Dress",
    slots: ["body", "legs"],
  },
  {
    key: "bathrobe",
    cost: 40,
    name: "Bath Robe",
    slots: ["body", "legs"],
  },
  {
    key: "pajamas",
    cost: 40,
    name: "Pajamas",
    slots: ["body", "legs"],
  },
];

export const findGarment = (key: string) => {
  const garment = garments.find((item) => item.key === key);
  if (!garment) {
    throw new Error(`no garment found with key: ${key}`);
  }
  return garment;
};
