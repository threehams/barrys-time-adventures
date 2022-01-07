export type Resource = "food" | "savedTime" | "money" | "water";
export type Resources = {
  [Key in Resource]: number;
};
