import numbro from "numbro";

export type Resource = "food" | "savedTime" | "money" | "water" | "junk";
export type Resources = {
  [Key in Resource]: number;
};

const resources: {
  key: Resource;
  name: string;
  format: (value: number) => string;
}[] = [
  {
    key: "food",
    name: "Rations",
    format: (value) =>
      numbro(value).format({
        thousandSeparated: true,
      }),
  },
  {
    key: "water",
    name: "Water",
    format: (value) =>
      `${numbro(value).format({
        thousandSeparated: true,
      })} gal`,
  },
  {
    key: "money",
    name: "Money",
    format: (value) =>
      `$${numbro(value).format({
        thousandSeparated: true,
      })}`,
  },
  {
    key: "junk",
    name: "Junk",
    format: (value) =>
      `${numbro(value).format({
        thousandSeparated: true,
      })} lb`,
  },
  {
    key: "savedTime",
    name: "Saved Time",
    format: (value) =>
      numbro(value).format({
        thousandSeparated: true,
      }),
  },
];

export const findResource = (key: Resource) => {
  const found = resources.find((resource) => resource.key === key);
  if (!found) {
    throw new Error(`Could not find a resource with key: ${key}`);
  }
  return found;
};
