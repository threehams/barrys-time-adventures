import { Garment } from "../Garment";

export const garments: Garment[] = [
  {
    key: "tshirt",
    name: "T-Shirt",
    slots: ["body"],
  },
  {
    key: "jeans",
    name: "Jeans",
    slots: ["legs"],
  },
  {
    key: "sleeppants",
    name: "Sleep Pants",
    slots: ["legs"],
  },
  {
    key: "leggings",
    name: "Leggings",
    slots: ["legs"],
  },
  {
    key: "skirt",
    name: "Skirt",
    slots: ["legs"],
  },
  {
    key: "socks",
    name: "Socks",
    slots: ["feet"],
  },
  {
    key: "boxers",
    name: "Boxers",
    slots: ["crotch"],
  },
  {
    key: "briefs",
    name: "Briefs",
    slots: ["crotch"],
  },
  {
    key: "panties",
    name: "Panties",
    slots: ["crotch"],
  },
  {
    key: "dress",
    name: "Dress",
    slots: ["body", "legs"],
  },
  {
    key: "bathrobe",
    name: "Bath Robe",
    slots: ["body", "legs"],
  },
  {
    key: "pajamas",
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
