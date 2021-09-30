import { ClothingSlot } from "./Garment";

type WearClothingAction = {
  type: "WEAR_CLOTHING";
  payload: { key: string; reuse: number };
};
type RemoveClothingAction = {
  type: "REMOVE_CLOTHING";
  payload: { slot: ClothingSlot };
};
type BuyUpgradeAction = { type: "BUY_UPGRADE"; payload: { key: string } };
type BuyGameAction = { type: "BUY_GAME"; payload: { key: string } };
type NextAction = { type: "NEXT" };
type ResetGameAction = { type: "RESET_GAME" };

export type StateAction =
  | RemoveClothingAction
  | WearClothingAction
  | BuyUpgradeAction
  | BuyGameAction
  | NextAction
  | ResetGameAction;
