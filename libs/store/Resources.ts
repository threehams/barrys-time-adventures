import numbro from "numbro";

export type Resource = "food" | "savedTime" | "money" | "water" | "junk";
export type Resources = {
  [Key in Resource]: number;
};
export type SourceKey =
  | "preserves"
  | "plants"
  | "shopping"
  | "rainfall"
  | "stream"
  | "well"
  | "betsy"
  | "crafts";

export const sources: { key: SourceKey; resource: Resource }[] = [
  { key: "betsy", resource: "money" },
  { key: "crafts", resource: "money" },
  { key: "well", resource: "water" },
  { key: "stream", resource: "water" },
  { key: "rainfall", resource: "water" },
  { key: "preserves", resource: "food" },
  { key: "plants", resource: "food" },
];

export const findSource = (key: SourceKey) => {
  const found = sources.find((source) => source.key === key);
  if (!found) {
    throw new Error(`Could not find a source with key: ${key}`);
  }
  return found;
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
