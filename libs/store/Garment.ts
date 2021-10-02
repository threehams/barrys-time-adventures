export type ClothingSlot = "body" | "legs" | "feet" | "crotch";
export type Garment = {
  name: string;
  key: string;
  cost: number;
  slots: ClothingSlot[];
};
